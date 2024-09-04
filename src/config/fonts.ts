import { Plus_Jakarta_Sans, Poppins, Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  fallback: ["var(--font-sans)", "system-ui", "arial"],
  adjustFontFallback: true,
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const plusJak = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plusJak",
  fallback: ["var(--font-sans)", "system-ui", "arial"],
  adjustFontFallback: true,
  display: "swap",
});

