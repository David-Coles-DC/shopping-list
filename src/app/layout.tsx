import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from '@/components/Header';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shopping List",
  description: "Shopping list frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel={'stylesheet'}
            href={'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=add,check_circle,delete,drag_indicator,edit,unpublished'} />
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <Header />
    <div className={'h-full'}>
          {children}
        </div>
      </body>
    </html>
);
}
