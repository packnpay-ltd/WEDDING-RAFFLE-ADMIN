import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "The Wedding Celebration",
  description: "A special celebration, with a little help from Osusu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <main>
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
