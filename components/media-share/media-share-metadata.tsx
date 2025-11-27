import { S3Object, SharedMediaGroupResponse } from 'lib/s3-object/types'
import Tag from '../Tag'

interface MediaShareMetadataProps {
  shareMediaGroup: SharedMediaGroupResponse
  media: S3Object
}

export default function MediaShareMetadata({ shareMediaGroup, media }: MediaShareMetadataProps) {
  return (
    <section className="space-y-3">
      <div>
        <div className="flex flex-row gap-2">
          {media.tags.map((tag) => (
            <Tag key={tag.id} tagId={tag.id} text={tag.name} color={tag.color} onClick={() => {}} />
          ))}
        </div>
      </div>
      <h1 className="text-balance text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl">
        {shareMediaGroup.title}
      </h1>
      {shareMediaGroup.description && (
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {shareMediaGroup.description}
        </p>
      )}
      {media.metadata?.caption && (
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {media.metadata.caption}
        </p>
      )}
      {media.metadata?.captionKo && (
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {media.metadata.captionKo}
        </p>
      )}
    </section>
  )
}
