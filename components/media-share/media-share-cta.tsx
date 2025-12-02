'use client'

import { useCallback, useState } from 'react'
import Link from '@/components/Link'
import { S3Object } from 'lib/s3-object/types'

interface MediaShareCTAProps {
  primaryHref?: string
  media: S3Object
}

export default function MediaShareCTA({ primaryHref, media }: MediaShareCTAProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

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

  const handleDownload = useCallback(async () => {
    if (!media.url) return

    setIsDownloading(true)
    try {
      // fetch로 파일을 가져와서 Blob으로 변환
      const response = await fetch(media.url)
      if (!response.ok) throw new Error('다운로드 실패')

      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      // 파일명 생성 (originalName 또는 기본값)
      const fileName = media.originalName || `media.${media.extension || 'bin'}`

      // 다운로드 링크 생성 및 클릭
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = fileName
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()

      // 정리
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('다운로드 오류:', error)
      // 실패 시 새 창에서 열기 (fallback)
      window.open(media.url, '_blank')
    } finally {
      setIsDownloading(false)
    }
  }, [media])

  return (
    <section className="mt-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.01] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:ring-offset-gray-900 sm:w-auto"
        >
          {isDownloading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              다운로드 중...
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              원본 다운로드
            </>
          )}
        </button>

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
