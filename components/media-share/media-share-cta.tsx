'use client'

import { useCallback, useState } from 'react'
import Link from '@/components/Link'

interface MediaShareCTAProps {
  primaryHref?: string
}

export default function MediaShareCTA({ primaryHref }: MediaShareCTAProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleShare = useCallback(async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: '공유된 미디어를 확인해보세요.',
          url: shareUrl,
        })
        return
      }
    } catch {
      // fall through to copy
    }

    if (navigator.clipboard && shareUrl) {
      try {
        await navigator.clipboard.writeText(shareUrl)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 1800)
      } catch {
        // ignore clipboard errors
      }
    }
  }, [])

  return (
    <section className="mt-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {primaryHref ? (
          <Link
            href={primaryHref}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.01] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:ring-offset-gray-900 sm:w-auto"
          >
            앱에서 열기
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-gray-200 px-5 py-3 text-sm font-semibold text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400 sm:w-auto"
          >
            곧 앱에서 열기 지원 예정
          </button>
        )}

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white/80 px-4 py-3 text-sm font-medium text-gray-800 shadow-sm backdrop-blur hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-800 sm:w-auto"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[11px] text-white dark:bg-white dark:text-gray-900">
            ↗
          </span>
          {isCopied ? '링크가 복사되었습니다' : '링크 공유 또는 복사'}
        </button>
      </div>
    </section>
  )
}
