'use client'
import { useState } from 'react'
import MediaShareLayout from './media-share-layout'
import { SharedMediaGroupResponse } from 'lib/s3-object/types'

interface MediaSharePageClientProps {
  shareMediaGroup: SharedMediaGroupResponse
}

export default function MediaSharePageClient({ shareMediaGroup }: MediaSharePageClientProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  const [inputCode, setInputCode] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { s3Object: medias = [], shareCode, expiredAt, title } = shareMediaGroup
  const hasMultiple = medias?.length > 1
  const isExpired = new Date(expiredAt).getTime() < Date.now()

  const handleVerify = () => {
    if (inputCode.trim() === shareCode) {
      setIsVerified(true)
      setErrorMessage(null)
      return
    }
    setErrorMessage('올바른 인증 코드를 입력해주세요.')
  }

  if (isExpired) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 rounded-3xl bg-white/90 p-6 text-center shadow-xl shadow-slate-900/10 ring-1 ring-gray-200/80 backdrop-blur dark:bg-gray-900/90 dark:ring-gray-700/70">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 dark:bg-red-900/40 dark:text-red-300">
            !
          </div>
          <div>
            <h1 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
              이 공유 링크는 만료되었습니다
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              보안을 위해 일정 시간이 지나면 공유 링크가 자동으로 만료됩니다.
            </p>
          </div>
          {title && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              공유된 미디어 그룹:{' '}
              <span className="font-medium text-gray-800 dark:text-gray-200">{title}</span>
            </p>
          )}
        </div>
      </div>
    )
  }

  if (!isVerified) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 rounded-3xl bg-white/90 p-6 shadow-xl shadow-slate-900/10 ring-1 ring-gray-200/80 backdrop-blur dark:bg-gray-900/90 dark:ring-gray-700/70">
          <div className="space-y-2 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              Secure Share
            </p>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              공유된 미디어에 접근하려면 인증 코드가 필요합니다
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              공유 받은 4자리 또는 6자리 인증 코드를 입력하면 미디어를 확인할 수 있습니다.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>인증 코드</span>
              {title && <span className="truncate text-[11px] opacity-80">그룹: {title}</span>}
            </div>
            <input
              type="text"
              inputMode="numeric"
              maxLength={8}
              value={inputCode}
              onChange={(event) => setInputCode(event.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-center text-lg tracking-[0.4em] text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="••••"
            />
            {errorMessage && (
              <p className="text-xs text-red-500 dark:text-red-400">{errorMessage}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleVerify}
            className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.01] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:ring-offset-gray-900"
          >
            인증하고 미디어 보기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full space-y-4">
        <div className="relative">
          <MediaShareLayout shareMediaGroup={shareMediaGroup} activeIndex={activeIndex} />

          {hasMultiple && (
            <>
              <button
                type="button"
                aria-label="이전 미디어"
                onClick={() => setActiveIndex((prev) => (prev - 1 + medias.length) % medias.length)}
                className="absolute left-0 top-1/2 flex -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white shadow-md backdrop-blur-md transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:left-3 sm:translate-x-0"
              >
                <span className="inline-block rotate-180 text-lg leading-none">{'›'}</span>
              </button>

              <button
                type="button"
                aria-label="다음 미디어"
                onClick={() => setActiveIndex((prev) => (prev + 1) % medias.length)}
                className="absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-1/2 rounded-full bg-black/30 p-2 text-white shadow-md backdrop-blur-md transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-3 sm:translate-x-0"
              >
                <span className="inline-block text-lg leading-none">{'›'}</span>
              </button>
            </>
          )}
        </div>

        {hasMultiple && (
          <div className="mt-4 space-y-2">
            {/* 상단 프로그레스 핀 */}
            <div className="mx-auto flex max-w-xs items-center gap-1 rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-900/80">
              {medias.map((_, index) => {
                const isActive = index === activeIndex
                return (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  />
                )
              })}
            </div>

            {/* 하단 미디어 캡슐 리스트 */}
            <div className="flex gap-3 overflow-x-auto pb-1 pt-1">
              {medias.map((media, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={media.id ?? index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group flex min-w-[6.5rem] items-center gap-2 rounded-2xl px-2.5 py-1.5 text-[11px] shadow-sm transition ${
                      isActive
                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/30 dark:bg-gray-100 dark:text-gray-900'
                        : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-xl text-[10px] font-semibold ${
                        media.fileType === 'video'
                          ? 'bg-gradient-to-tr from-pink-500 to-orange-500 text-white'
                          : 'bg-gradient-to-tr from-sky-500 to-emerald-400 text-white'
                      }`}
                    >
                      {media.fileType === 'video' ? 'VID' : 'IMG'}
                    </div>
                    <div className="flex flex-1 flex-col items-start">
                      <span
                        className={`line-clamp-1 text-[11px] ${
                          isActive ? 'font-semibold' : 'font-medium'
                        }`}
                      >
                        {media.metadata.caption || `미디어 ${index + 1}`}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        #{index + 1} · {media.fileType === 'video' ? 'Video' : 'Image'}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
