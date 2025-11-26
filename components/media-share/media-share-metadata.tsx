import { S3Object, SharedMediaGroupResponse } from 'lib/s3-object/types'

interface MediaShareMetadataProps {
  shareMediaGroup: SharedMediaGroupResponse
}

export default function MediaShareMetadata({ shareMediaGroup }: MediaShareMetadataProps) {
  return (
    <section className="space-y-3">
      <div>
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl">
          {shareMediaGroup.title}
        </h1>
        {shareMediaGroup.user.username && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            by{' '}
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {shareMediaGroup.user.username}
            </span>
          </p>
        )}
      </div>
      {shareMediaGroup.description && (
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {shareMediaGroup.description}
        </p>
      )}
    </section>
  )
}
