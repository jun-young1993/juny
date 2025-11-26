import Image from '@/components/Image'
import { S3Object } from 'lib/s3-object/types'

interface MediaShareHeaderProps {
  media: S3Object
}

export default function MediaShareHeader({ media }: MediaShareHeaderProps) {
  return (
    <header className="mb-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 p-[2px] shadow-md">
          <div className="flex h-9 items-center rounded-2xl bg-white/80 px-3 text-xs font-semibold tracking-wide text-gray-900 backdrop-blur dark:bg-gray-900/70 dark:text-gray-50">
            Media Share
          </div>
        </div>
        <span className="hidden text-xs text-gray-500 dark:text-gray-400 sm:inline">
          프리미엄 미디어 미리보기
        </span>
      </div>
      {media.thumbnailUrl && (
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/40 shadow-sm dark:border-gray-700">
            <Image
              src={media.thumbnailUrl}
              alt={media.user.username}
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hidden text-right text-xs leading-tight sm:block">
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {media.user.username}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">공유한 크리에이터</div>
          </div>
        </div>
      )}
    </header>
  )
}
