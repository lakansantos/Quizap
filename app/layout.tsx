import type {Metadata} from "next";
import {Marhey} from "next/font/google";
import "./globals.css";

const marhey = Marhey({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const revalidate = 5;
export const metadata: Metadata = {
  title: "Quizap",
  description: "A quiz web application",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={marhey.className}>{children}</body>
    </html>
  );
}
