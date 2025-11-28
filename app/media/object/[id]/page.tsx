import { findS3Object } from 'lib/s3-object/s3.fetch'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

// export async function generateMetadata(props: PageProps): Promise<Metadata> {
//     const { id } = await props.params
//     const media = await getMedia(id)
//     return genPageMetadata({
//         title: media.title,
//         description: media.description,
//     })
// }

export default async function Page(props: PageProps) {
  // 7391aa24-1052-40d0-a109-dfc2895f41d5
  const { id } = await props.params
  const s3Object = await findS3Object(id)
  console.log(s3Object)
  if (!s3Object) {
    return notFound()
  }
  return <div>{s3Object.originalName}</div>
}
