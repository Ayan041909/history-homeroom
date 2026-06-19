import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { TouchDeviceMarker } from "@/components/providers/TouchDeviceMarker";
import { MobileMotionFix } from "@/components/providers/MobileMotionFix";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ChatBot } from "@/components/shared/ChatBot";
import { AccessibilityBar } from "@/components/shared/AccessibilityBar";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "History Homeroom — Learn History Like Never Before",
  description:
    "History Homeroom is an elite educational platform offering live tutoring, interactive lessons, and deep dives into the most pivotal moments in human history.",
  keywords: ["history", "education", "tutoring", "online learning", "historical events"],
  openGraph: {
    title: "History Homeroom",
    description: "Learn history with the best tutors. Live sessions, quizzes, and immersive content.",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <TouchDeviceMarker />
          <MobileMotionFix />
          <ScrollProgress />
          <AccessibilityBar />
          <Navbar />
          <main className="flex min-w-0 flex-1 flex-col">{children}</main>
          <Footer />
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
