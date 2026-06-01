import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Wedding of Banyu & Fadli",
  description: "You're Invited to The Wedding of Banyu & Fadli - 16 May 2026",
  openGraph: {
    title: "The Wedding of Banyu & Fadli",
    description: "You're Invited",
    images: ["https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
