import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";

export const metadata = {
  title: "portfolio",
  description: "my portfolio project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}