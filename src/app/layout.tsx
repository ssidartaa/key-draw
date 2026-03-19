import { ReactNode } from "react";
import type { Metadata } from "next";

import WordProvider from "@/contexts/layout";

import { ThemeProvider } from "next-themes";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "Sorteio de Palavras",
  description: "Sorteie palavras de sua escolha e divirta-se",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="pt-BR" className="--vsc-domain" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <WordProvider>{children}</WordProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
