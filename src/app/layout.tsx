import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "Tiendanimal",
  description: "Iskaypet challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={openSans.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
