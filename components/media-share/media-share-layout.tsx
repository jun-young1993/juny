import MediaShareHeader from './media-share-header'
import MediaShareMedia from './media-share-media'
import MediaShareMetadata from './media-share-metadata'
import MediaShareCTA from './media-share-cta'
import { SharedMediaGroupResponse } from 'lib/s3-object/types'

export type MediaShareLayoutVariant = 'stacked' | 'split' | 'media-focused'

interface MediaShareLayoutProps {
  shareMediaGroup: SharedMediaGroupResponse
  activeIndex: number
}

export default function MediaShareLayout({ shareMediaGroup, activeIndex }: MediaShareLayoutProps) {
  const { s3Object: medias, user: creator } = shareMediaGroup
  const activeMedia = medias[activeIndex] ?? medias[0]

  // stacked (default)
  return (
    <div className="mx-auto w-full max-w-3xl space-y-5 rounded-3xl bg-white/80 p-5 shadow-xl shadow-slate-900/10 ring-1 ring-gray-200/70 backdrop-blur-md dark:bg-gray-900/80 dark:ring-gray-700/70 sm:p-7">
      <MediaShareHeader media={activeMedia} />
      <MediaShareMedia media={activeMedia} />
      <MediaShareMetadata shareMediaGroup={shareMediaGroup} />
      <MediaShareCTA />
    </div>
  )
}
