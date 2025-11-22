import "./globals.css";
import CRTChrome from "./components/CRTChrome";
import CRTClientShell from "./components/CRTClientShell";

export const metadata = {
  title: "Coding Blog Terminal",
  description: "Retro-Futuristic CRT code comparison terminal blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CRTChrome>
          <CRTClientShell>
            {children}
          </CRTClientShell>
        </CRTChrome>
      </body>
    </html>
  );
}
