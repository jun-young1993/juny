'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionContainer from '@/components/SectionContainer'
import { SearchProvider, SearchConfig } from 'pliny/search'
import siteMetadata from '@/data/siteMetadata'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isSharePath = pathname?.includes('/media') ?? false
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  )
  if (isSharePath) {
    // share 경로에서는 Header/Footer 없이 children만 렌더링
    return (
      <QueryClientProvider client={queryClient}>
        <main className="mb-auto">{children}</main>
      </QueryClientProvider>
    )
  }

  // 일반 경로에서는 Header/Footer 포함
  return (
    <SectionContainer>
      <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className="mb-auto">{children}</main>
        </QueryClientProvider>
      </SearchProvider>

      <Footer />
    </SectionContainer>
  )
}
