import { S3Object, SharedMediaGroupResponse } from 'lib/s3-object/types'
import Link from 'next/link'
import ThemeSwitch from '../ThemeSwitch'

interface MediaShareHeaderProps {
  shareMediaGroup: SharedMediaGroupResponse
  media: S3Object
  hasMultiple?: boolean
  onOpenGrid?: () => void
}

export default function MediaShareHeader({
  media,
  hasMultiple,
  shareMediaGroup,
  onOpenGrid,
}: MediaShareHeaderProps) {
  return (
    <header className="mb-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 p-[2px] shadow-md">
          <Link
            href={`/redirect/app/store/name/${media.appName}`}
            className="flex h-9 items-center rounded-2xl bg-white/80 px-3 text-xs font-semibold tracking-wide text-gray-900 backdrop-blur dark:bg-gray-900/70 dark:text-gray-50"
          >
            {media.appName}
          </Link>
        </div>

        <span className="hidden text-xs text-gray-500 dark:text-gray-400 sm:inline">
          {shareMediaGroup.title}
        </span>

        <ThemeSwitch />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="text-right text-xs leading-tight sm:block">
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {media.user.username}
            </div>
            {/* <div className="text-[11px] text-gray-500 dark:text-gray-400">공유한 크리에이터</div> */}
          </div>
        </div>
        {hasMultiple && onOpenGrid && (
          <button
            type="button"
            aria-label="썸네일 그리드 열기"
            onClick={onOpenGrid}
            className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-gray-200 bg-white/80 text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-800"
          >
            <span className="grid h-4 w-4 grid-cols-3 gap-[1px] text-[0]">
              <span className="h-full w-full rounded-[2px] bg-gray-400/90 dark:bg-gray-500/90" />
              <span className="h-full w-full rounded-[2px] bg-gray-300/90 dark:bg-gray-600/90" />
              <span className="h-full w-full rounded-[2px] bg-gray-400/90 dark:bg-gray-500/90" />
              <span className="h-full w-full rounded-[2px] bg-gray-300/90 dark:bg-gray-600/90" />
              <span className="h-full w-full rounded-[2px] bg-gray-400/90 dark:bg-gray-500/90" />
              <span className="h-full w-full rounded-[2px] bg-gray-300/90 dark:bg-gray-600/90" />
              <span className="h-full w-full rounded-[2px] bg-gray-400/90 dark:bg-gray-500/90" />
              <span className="h-full w-full rounded-[2px] bg-gray-300/90 dark:bg-gray-600/90" />
              <span className="h-full w-full rounded-[2px] bg-gray-400/90 dark:bg-gray-500/90" />
            </span>
          </button>
        )}
      </div>
    </header>
  )
}
