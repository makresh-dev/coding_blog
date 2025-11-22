import "./globals.css";

export const metadata = {
  title: "Coding Blog Terminal",
  description: "CRT Doom Emacs Style Interactive Coding Terminal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden overflow-y-auto min-h-screen">

        {/* CRT Shine Layer (animated) */}
        <div className="crt-scanshine"></div>

        {/* Cursor Flicker Overlay */}
        <div className="crt-cursor-overlay bottom-[20%] left-[10%] w-[140px] h-[28px] bg-[rgba(0,255,80,0.15)] blur-lg absolute"></div>

        {children}
      </body>
    </html>
  );
}
