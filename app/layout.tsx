import type { Metadata } from "next";
import { Space_Grotesk, Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Saif Ullah Arshad | ML Engineer & Full Stack Developer",
  description:
    "CS Student at ITU Lahore. ML Engineering Intern at FlyRank AI. Building intelligent systems at the intersection of ML and software engineering.",
  keywords: [
    "Saif Ullah Arshad",
    "ML Engineer",
    "Full Stack Developer",
    "ITU Lahore",
    "Machine Learning",
    "React",
    "Next.js",
    "Python",
    "PyTorch",
  ],
  authors: [{ name: "Saif Ullah Arshad" }],
  creator: "Saif Ullah Arshad",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Saif Ullah Arshad | ML Engineer & Full Stack Developer",
    description:
      "CS Student at ITU Lahore. Building intelligent systems at the intersection of ML and software engineering.",
    siteName: "Saif Ullah Arshad Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${firaCode.variable}`}
      >
        <CustomCursor />
        <LoadingScreen />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}