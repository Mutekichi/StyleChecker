import { ChakraProvider } from "@chakra-ui/react"
import type { Metadata } from "next"
import localFont from "next/font/local"

const notoSans = localFont({
  src: "../../public/fonts/NotoSansSymbols-VariableFont_wght.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Style Checker",
  description: "Style Checker",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSans.variable} antialiased`}>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  )
}
