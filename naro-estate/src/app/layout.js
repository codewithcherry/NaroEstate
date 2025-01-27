import Footer from "@/components/react-components/Footer";
import "./globals.css";
import Navbar from "@/components/react-components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Navbar />
        {children}
        <Toaster/>
        <Footer />
      </body>
    </html>
  );
}
