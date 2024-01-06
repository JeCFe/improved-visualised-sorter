import type { Metadata } from "next";
import { Footer, Header } from "@jecfe/react-design-system";
import "@jecfe/react-design-system/src/tailwind.css";

export const metadata: Metadata = {
  title: "Improved visualised sorter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white font-mono">
        <Header title="JeCFe - Improved visualised sorter" />
        <div className="flex-1 container mx-auto">{children}</div>
        <Footer>JeCFe - Improved visualised sorter</Footer>
      </body>
    </html>
  );
}
