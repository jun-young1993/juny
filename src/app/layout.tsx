import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import RecoilRootProvider from '@/providers/only-rayout/recoil-root.provider'
import RootLayoutWrapProvider from '@/providers/only-rayout/root-rayout-wrap.provider'
import { ReactNode } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";
import { TITLE } from '@/lib/config/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: TITLE,
  description: 'jun young blog',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
        <body
            className={`${inter.className} flex flex-col h-screen bg-gradient-to-r from-purple-300 to-pink-100 dark:from-purple-700 to-pink-500`}
        >
          <RecoilRootProvider>
            <RootLayoutWrapProvider>{children}</RootLayoutWrapProvider>
          </RecoilRootProvider>
        </body>
        <GoogleAnalytics gaId={"G-85P217MXF2"}/>
        <Script async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4656262305566191"
                crossOrigin="anonymous"></Script>
    </html>
  )
}
