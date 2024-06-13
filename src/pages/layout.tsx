import { Inter } from "next/font/google";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <div>{children}</div>
    </html>
  );
}
