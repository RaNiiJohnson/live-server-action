import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/src/features/layout/Footer";
import { Header } from "@/src/features/layout/Header";
import { ThemeProvider } from "@/src/theme/ThemeProvider";
import clsx from "clsx";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Threads-clone-yeah",
  description: "the social network for developer",
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className="h-full">
      <body className={clsx("bg-background")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex flex-col h-full">
            <Header />
            <Toaster />
            <div className="flex-1 w-full max-w-lg m-auto py-14">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
