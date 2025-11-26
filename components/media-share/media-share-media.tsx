'use client'

import { useState } from 'react'
import { S3Object } from 'lib/s3-object/types'

interface MediaShareMediaProps {
  media: S3Object
}

export default function MediaShareMedia({ media }: MediaShareMediaProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-gray-200/70 bg-gray-50/80 shadow-[0_18px_45px_rgba(15,23,42,0.15)] backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/70`}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="flex flex-col items-center gap-3">
            <svg
              className="h-8 w-8 animate-spin text-gray-400 dark:text-gray-500"
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
            <p className="text-xs text-gray-500 dark:text-gray-400">미디어를 불러오는 중...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              미디어를 불러올 수 없습니다
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              링크가 만료되었거나 접근 권한이 없을 수 있습니다
            </p>
          </div>
        </div>
      )}

      {media.fileType === 'video' ? (
        <video
          src={media.url}
          controls
          playsInline
          preload="metadata"
          onLoadedData={handleLoad}
          onError={handleError}
          className="h-full max-h-[520px] w-full bg-black object-contain"
        >
          {/* Caption track for accessibility - empty since caption files aren't available yet */}
          <track kind="captions" srcLang="ko" label="Korean" />
        </video>
      ) : (
        // S3 presigned URL은 Next.js Image 최적화가 실패하므로 일반 img 태그 사용
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.url}
          alt={media.metadata.caption || '미디어 이미지'}
          onLoad={handleLoad}
          onError={handleError}
          className="h-full max-h-[520px] w-full object-cover"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 mix-blend-multiply dark:from-black/45" />
    </div>
  )
}
