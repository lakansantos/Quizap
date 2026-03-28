import type {Metadata} from "next";
import {Sora, DM_Sans, Manrope} from "next/font/google";
import "./globals.css";
import {ScoreProvider} from "./contexts/QuizContext";
import {MusicProvider} from "./contexts/MusicContext";
import {ThemeProvider} from "./contexts/ThemeContext";
import MusicToggle from "./components/MusicToggle";
import Providers from "./utils/providers";

const sora = Sora({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const manrope = Manrope({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Quizap",
  description: "Test Your Knowledge. Challenge Your Friends.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sora.variable} ${dmSans.variable} ${manrope.variable}`}
      >
        <Providers>
          <ThemeProvider>
            <MusicProvider>
              <ScoreProvider>
                {children}
                <MusicToggle />
              </ScoreProvider>
            </MusicProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
