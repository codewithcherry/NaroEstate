import Footer from "@/components/react-components/Footer";
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
        <Footer />
      </body>
    </html>
  );
}
