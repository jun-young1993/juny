import BlogContent from '@/components/contents/blog.content';
import ContainerLayout from '@/components/layouts/container.layouts';
import { ObsidianContentsByBlog } from '@/lib/client/obsidian.client';
import { BlogContentInterface } from '@/types/blog.type';

import { MenuType } from '@/types/menu.type';
// import { useRouter } from 'next/router';

async function getData(): Promise<BlogContentInterface[]> {
  const res = await ObsidianContentsByBlog();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  return res;  
}

export default async function Page(){
  const data = await getData();
  // const router = useRouter();
  // console.log(router.query.slug);
  return (
      <ContainerLayout 
        children={
          <BlogContent data={data} />
        } 
        title={MenuType.BLOG} 
      />
  )
}
// export default function Page() {
//   const router = useRouter()
//   return <p>Post: {router.query.slug}</p>
// }
