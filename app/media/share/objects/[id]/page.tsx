import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'
import { getSharedMediaGroup } from 'lib/s3-object/share.fetch'
import MediaShareObjectsGalleryClient from '@/components/media-share/media-share-objects-gallery-client'
interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { id } = await props.params
  const shareMediaGroup = await getSharedMediaGroup(id, 0, 1)
  return genPageMetadata({
    title: shareMediaGroup.title,
    description:
      shareMediaGroup.description || shareMediaGroup.s3Object.length + '개의 미디어를 공유합니다.',
    image: shareMediaGroup.s3Object[0].thumbnailUrl,
  })
}

export default async function Page(props: PageProps) {
  const { id } = await props.params
  const take = 20
  const shareMediaGroup = await getSharedMediaGroup(id, 0, take)

  return <MediaShareObjectsGalleryClient shareId={id} initialData={shareMediaGroup} take={take} />
}
