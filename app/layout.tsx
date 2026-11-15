import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { Background } from "@/components/Background";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const display = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guess the Number",
  description:
    "An arcade-style number guessing game. Crack the secret number before your hearts run out, with hot and cold hints, streaks, scores and four colour themes.",
};

export const viewport: Viewport = {
  themeColor: "#1e1b4b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme is set by the inline script before paint, so the attribute can differ from the server markup.
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <Background />
        {children}
      </body>
    </html>
  );
}
