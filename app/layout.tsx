import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CryptoForex AI Predictor — AI-Powered Commodity Price Forecasting",
    template: "%s | CryptoForex AI Predictor",
  },
  description:
    "AI-powered commodity price prediction platform using LSTM deep learning models. Forecast Bitcoin, Gold, and Silver prices with technical indicator analysis, model comparison, and interactive dashboards.",
  keywords: [
    "cryptocurrency prediction",
    "commodity price forecast",
    "LSTM model",
    "Bitcoin prediction",
    "Gold forecast",
    "Silver forecast",
    "technical indicators",
    "AI trading",
    "machine learning finance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      data-theme="dark"
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
