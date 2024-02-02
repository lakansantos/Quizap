import type {Metadata} from "next";
import {Marhey} from "next/font/google";
import "./globals.css";
import {ScoreProvider} from "./contexts/QuizContext";
import Providers from "./utils/providers";

const marhey = Marhey({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Quizap",
  description: "A quiz web application",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={marhey.className}>
        <Providers>
          <ScoreProvider>{children}</ScoreProvider>
        </Providers>
      </body>
    </html>
  );
}
