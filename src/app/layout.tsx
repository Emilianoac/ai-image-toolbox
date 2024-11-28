import { Open_Sans } from "next/font/google";
import "./globals.css";
import AppNavbar from "@/components/globals/AppNavbar";
import { ThemeProvider } from "@/components/globals/ThemeProvider";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import appMetaData from "@/constants/meta-data";
import { AppStoreProvider } from "@/providers/app-state-provider";

export const metadata: Metadata = {
  title: {
    default: appMetaData.default.title,
    template: `%s - ${appMetaData.default.title}`
  },
  description: appMetaData.default.description,
};

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body 
        className={`
          ${openSans.className} 
          antialiased 
          bg-app-light-200 dark:bg-app-dark-200
          text-black dark:text-white
          `
        }>
        <NextTopLoader color="#ff3a8d" showSpinner={false}/>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            >
            <AppStoreProvider>
              <AppNavbar />
              {children}
            </AppStoreProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
