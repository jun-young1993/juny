import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'
import MediaSharePageClient from '@/components/media-share/media-share-page-client'
import { getSharedMediaGroup } from 'lib/s3-object/share.fetch'

interface PageProps {
  params: Promise<{
    id: string
    skip: string
    take: string
    verify: string
  }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { id } = await props.params
  const shareMediaGroup = await getSharedMediaGroup(id)
  return genPageMetadata({
    title: shareMediaGroup.title,
    description:
      shareMediaGroup.description || shareMediaGroup.s3Object.length + '개의 미디어를 공유합니다.',
    image: shareMediaGroup.s3Object[0].thumbnailUrl,
  })
}

/**
 * 공유 링크를 통해 전달된 이미지 또는 비디오를 미리 볼 수 있는 페이지입니다.
 * test id: 17db48b7-9487-49fa-9f24-e131d7a05f40
 * @param props
 * @returns
 */
export default async function Page(props: PageProps) {
  const { id, skip, take, verify } = await props.params

  // TODO: 실제 API 연동 시 id를 사용해 공유 미디어 그룹 데이터를 조회하도록 변경
  const shareMediaGroup = await getSharedMediaGroup(id, Number(skip), Number(take))

  return (
    <MediaSharePageClient
      shareMediaGroup={shareMediaGroup}
      isVerifiedState={shareMediaGroup.shareCode === verify}
      initialGridOpen={shareMediaGroup.shareCode === verify}
    />
  )
}
