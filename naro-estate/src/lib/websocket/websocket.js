import { WebSocketServer } from "ws";
import PendingBooking from "@/lib/models/pendingBooking.model";
import connect from "@/lib/mongoDb/database";

const clients = new Map();

export const setupWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws, req) => {
    const urlParams = new URL(req.url, `http://${req.headers.host}`);
    const token = urlParams.searchParams.get("token");

    if (!token) {
      ws.close();
      return;
    }

    await connect();

    // Find pending booking with this token
    const pendingBooking = await PendingBooking.findOne({ token });

    if (!pendingBooking) {
      ws.send(JSON.stringify({ type: "error", message: "Invalid token" }));
      ws.close();
      return;
    }

    const listingId = pendingBooking.listingId;

    // Store client connection
    if (!clients.has(listingId)) {
      clients.set(listingId, []);
    }
    clients.get(listingId).push({ token, ws });

    // Send initial queue position
    await sendQueueUpdate(listingId);
  });

  console.log("WebSocket server started ✅");
};

// Send queue updates to all users in the same listing queue
const sendQueueUpdate = async (listingId) => {
  await connect();

  const queue = await PendingBooking.find({ listingId }).sort({ createdAt: 1 });

  queue.forEach((booking, index) => {
    const userWs = clients.get(listingId)?.find((c) => c.token === booking.token);
    if (userWs) {
      userWs.ws.send(
        JSON.stringify({
          type: "queue_update",
          position: index + 1,
          message: index === 0 ? "It's your turn! Proceed to payment." : `You are in position ${index + 1}. Please wait.`,
        })
      );
    }
  });
};

// Remove expired tokens and notify next user
export const checkAndRemoveExpiredBookings = async () => {
  await connect();

  const now = new Date();
  const expiredBookings = await PendingBooking.find({ expiresAt: { $lt: now } });

  for (const booking of expiredBookings) {
    await PendingBooking.deleteOne({ _id: booking._id });

    // Notify other users in the queue
    if (clients.has(booking.listingId)) {
      clients.set(
        booking.listingId,
        clients.get(booking.listingId).filter((c) => c.token !== booking.token)
      );

      await sendQueueUpdate(booking.listingId);
    }
  }
};
