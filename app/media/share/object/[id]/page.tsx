import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'
import MediaSharePageClient from '@/components/media-share/media-share-page-client'
import { getSharedMediaGroup } from 'lib/s3-object/share.fetch'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = genPageMetadata({
  title: '공유된 미디어 미리보기',
  description: '공유 링크를 통해 전달된 이미지 또는 비디오를 미리 볼 수 있는 페이지입니다.',
})

/**
 * 공유 링크를 통해 전달된 이미지 또는 비디오를 미리 볼 수 있는 페이지입니다.
 * test id: 17db48b7-9487-49fa-9f24-e131d7a05f40
 * @param props
 * @returns
 */
export default async function Page(props: PageProps) {
  const { id } = await props.params

  // TODO: 실제 API 연동 시 id를 사용해 공유 미디어 그룹 데이터를 조회하도록 변경
  const shareMediaGroup = await getSharedMediaGroup(id)

  return <MediaSharePageClient shareMediaGroup={shareMediaGroup} />
}
