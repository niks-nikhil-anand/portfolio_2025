import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nikhil Anand | Full Stack Developer",
  description: "Explore the portfolio of Nikhil Anand, a Full Stack Developer specializing in building modern, performant, and scalable web applications.",
  keywords: ["Nikhil Anand", "Full Stack Developer", "Portfolio", "Web Development", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Nikhil Anand" }],
  creator: "Nikhil Anand",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nikhilanand.com", // Assuming a placeholder or known domain
    title: "Nikhil Anand | Full Stack Developer",
    description: "Full Stack Developer portfolio showcasing modern web applications and technical expertise.",
    siteName: "Nikhil Anand Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Anand | Full Stack Developer",
    description: "Full Stack Developer portfolio showcasing modern web applications and technical expertise.",
    creator: "@nikhilanand", // Example handle
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${inter.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
