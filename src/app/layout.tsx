import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: site.name.he,
  description: site.tagline.he,
  // The temporary Firebase URL must not be indexed (docs/research/local-seo-and-marketing.md).
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body>
        <a className="skip-link" href="#main">
          דילוג לתוכן הראשי
        </a>
        {children}
      </body>
    </html>
  );
}
