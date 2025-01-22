import "./globals.css";
import Navbar from "@/components/react-components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
