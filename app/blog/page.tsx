import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import {getPosts, getTagsWithPostCount} from "../../lib/weblog";

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const posts = await getPosts({
    limit: 5,
    page: 1,
  })
  const tags = await getTagsWithPostCount()

  return (
      <ListLayout
          posts={posts.data}
          pagination={posts.pagination}
          tags={tags}
          title="All Posts"
      />
  )
}
