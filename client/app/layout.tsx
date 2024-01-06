import type { Metadata } from "next";
import { Footer, Header, NextUser } from "@jecfe/react-design-system";
import "@jecfe/react-design-system/src/tailwind.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "Auth0 Client",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="flex flex-col min-h-screen bg-white font-mono">
          <Header title="JeCFe - Template" user={<NextUser />} />
          <div className="flex-1 container mx-auto">{children}</div>
          <Footer>JeCFe - Template</Footer>
        </body>
      </UserProvider>
    </html>
  );
}
