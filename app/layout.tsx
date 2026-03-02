import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { GlobalContextProvider } from "@/lib/context/GlobalContext";
import { FirebaseProvider } from "@/components/shared/FirebaseProvider";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { CrisisFooter } from "@/components/layout/CrisisFooter";
import { DisclaimerBanner } from "@/components/shared/DisclaimerBanner";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "innerBloom – Personal Psychology Companion",
  description:
    "A bilingual (EN/ES) personal psychology companion for self-reflection, growth, and emotional support.",
  keywords: ["psychology", "mental health", "therapy", "enneagram", "self-discovery"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${dmSans.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseProvider>
            <NextIntlClientProvider messages={messages}>
              <GlobalContextProvider>
                <DisclaimerBanner />
                <Header />
                <main className="flex-1 pb-16 md:pb-0">{children}</main>
                <MobileNav />
                <CrisisFooter />
                <Toaster richColors position="top-right" />
              </GlobalContextProvider>
            </NextIntlClientProvider>
          </FirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
