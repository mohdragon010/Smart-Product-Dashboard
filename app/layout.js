import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import Navbar from "@/components/navbar";
import FloatingActions from "@/components/FloatingActions";
import NotificationToast from "@/components/NotificationToast";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart products dashboard",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grain`}
      >
        <ThemeProvider>
          <Navbar />
          <FloatingActions />
          <NotificationToast />
          <Analytics />
          <main className="pt-18">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
