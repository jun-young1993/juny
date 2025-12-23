import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'css/mdx-editor.css'
import 'remark-github-blockquote-alert/alert.css'

import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { getMe } from '../lib/weblog'
import { cookies } from 'next/headers'
import ConditionalLayout from '@/components/ConditionalLayout'
import { MeOperation } from 'lib/weblog/types'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()

  const token = cookieStore.get('Authorization')

  let user: MeOperation['data']['me'] | null = null
  if (token !== undefined && token.value) {
    user = await getMe(token.value)
  }

  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <ConditionalLayout>
            {children}
            {/* <FloatingActionUserButton
              items={[
                <Link key={'/post/create'} href={'/post/create'}>
                  <BlogWriteIcon />
                </Link>,
              ]}
            >
              {user ? (
                <PlusIcon />
              ) : (
                <Link href={'/login'}>
                  <LoginIcon className={'h-5 w-5'} />
                </Link>
              )}
            </FloatingActionUserButton> */}
          </ConditionalLayout>
        </ThemeProviders>
        <Toaster
          position={'top-right'}
          toastOptions={{
            // 성공 토스트 스타일
            success: {
              className: 'bg-green-100 text-green-800 border border-green-300 rounded-lg shadow-lg',
              iconTheme: {
                primary: '#22c55e', // 아이콘 색상
                secondary: '#e5f9e3', // 아이콘 배경색
              },
            },
            // 에러 토스트 스타일
            error: {
              className: 'bg-red-100 text-red-800 border border-red-300 rounded-lg shadow-lg',
              iconTheme: {
                primary: '#ef4444', // 아이콘 색상
                secondary: '#fee2e2', // 아이콘 배경색
              },
            },
            // 기본 토스트 스타일
            className: 'bg-white text-gray-800 border border-gray-300 rounded-lg shadow-md',
          }}
        />
      </body>
    </html>
  )
}
