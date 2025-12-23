'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { getSharedMediaGroup } from 'lib/s3-object/share.fetch'
import type { SharedMediaGroupResponse, S3Object } from 'lib/s3-object/types'

interface MediaShareObjectsGalleryClientProps {
  shareId: string
  initialData: SharedMediaGroupResponse
  take: number
}

interface GalleryItem {
  media: S3Object
  absoluteIndex: number
}

function getNextSkip(lastPage: SharedMediaGroupResponse) {
  const skip = Number(lastPage.pagination.skip) || 0
  const take = Number(lastPage.pagination.take) || 0
  const totalPages = Number(lastPage.pagination.totalPages) || 0

  // Prefer totalPages because some APIs return an incorrect "total" count for deep paging.
  const currentPage = Math.floor(skip / take) + 1 // 1-based
  if (Number.isFinite(totalPages) && totalPages > 0) {
    if (currentPage >= totalPages) return undefined
    return skip + take
  }

  // Fallback: keep fetching while the server returns full pages.
  return lastPage.s3Object.length === take ? skip + take : undefined
}

function getPreviewHref(objectId: string) {
  return `/media/share/object/single-fetch/${objectId}`
}

export default function MediaShareObjectsGalleryClient({
  shareId,
  initialData,
  take,
}: MediaShareObjectsGalleryClientProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ['share-media-group', shareId, take],
      queryFn: async ({ pageParam }) => getSharedMediaGroup(shareId, pageParam, take),
      initialPageParam: 0,
      getNextPageParam: getNextSkip,
      initialData: {
        pages: [initialData],
        pageParams: [0],
      },
    })

  useEffect(() => {
    const element = sentinelRef.current
    if (!element) return
    if (!hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        if (isFetchingNextPage) return
        fetchNextPage()
      },
      { rootMargin: '600px 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const shareCode = initialData.shareCode
  const title = initialData.title
  const description = initialData.description

  const items: GalleryItem[] = useMemo(() => {
    const pages = data?.pages ?? []
    return pages.flatMap((page) =>
      page.s3Object.map((media, index) => ({
        media,
        absoluteIndex: (Number(page.pagination.skip) || 0) + index,
      }))
    )
  }, [data?.pages])

  return (
    <div className="min-h-[100vh] bg-gradient-to-b from-white to-gray-50 px-4 py-8 dark:from-gray-950 dark:to-gray-950 sm:px-6">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
                Shared Gallery
              </p>
              <h1 className="text-balance text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl">
                {title}
              </h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs text-gray-700 shadow-sm ring-1 ring-gray-200/70 backdrop-blur dark:bg-gray-900/70 dark:text-gray-200 dark:ring-gray-700/70">
              <span className="font-semibold tabular-nums">{items.length}</span>
              <span className="text-gray-500 dark:text-gray-400">loaded</span>
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <span className="font-semibold tabular-nums">{initialData.pagination.total}</span>
              <span className="text-gray-500 dark:text-gray-400">total</span>
            </div>
          </div>
          {description && (
            <p className="max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </header>

        {isError && (
          <div className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-gray-200/70 dark:bg-gray-900/70 dark:ring-gray-700/70">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
              데이터를 불러오지 못했습니다
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {(error as Error)?.message ?? '알 수 없는 오류'}
            </p>
          </div>
        )}

        <section className="space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map(({ media, absoluteIndex }) => {
              const href = getPreviewHref(media.id)
              const isVideo = media.fileType === 'video'

              return (
                <Link
                  key={media.id}
                  href={href}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-gray-200/70 transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-gray-900/60 dark:ring-gray-800/80"
                >
                  {/* S3 presigned URL / external URL: keep img */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={media.thumbnailUrl || media.lowResUrl || media.url}
                    alt={media?.metadata?.caption || media.originalName || '미디어'}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

                  <div className="pointer-events-none absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
                    <span className="tabular-nums">#{absoluteIndex + 1}</span>
                  </div>

                  {isVideo && (
                    <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
                      VID
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-x-2 bottom-2">
                    <div className="line-clamp-1 rounded-xl bg-black/45 px-2 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur">
                      {media?.metadata?.caption || media.originalName}
                    </div>
                  </div>
                </Link>
              )
            })}

            {/* Skeletons while loading next page */}
            {isFetchingNextPage &&
              Array.from({ length: Math.min(10, take) }, (_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="aspect-square animate-pulse rounded-2xl bg-gray-200/70 ring-1 ring-gray-200 dark:bg-gray-800/50 dark:ring-gray-800"
                />
              ))}
          </div>

          <div className="flex items-center justify-center">
            {hasNextPage ? (
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm backdrop-blur transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                {isFetchingNextPage ? '불러오는 중…' : '더 보기'}
              </button>
            ) : (
              <div className="text-xs text-gray-500 dark:text-gray-400">마지막 페이지입니다</div>
            )}
          </div>

          <div ref={sentinelRef} />

          {isLoading && (
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">불러오는 중…</div>
          )}
        </section>
      </div>
    </div>
  )
}
