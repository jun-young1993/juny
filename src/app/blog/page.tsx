import BlogContent from '@/components/contents/blog.content';
import ContainerLayout from '@/components/layouts/container.layouts';
import { ObsidianContentsByBlog } from '@/lib/client/obsidian.client';
import { BlogContentInterface } from '@/types/blog.type';

import { MenuType } from '@/types/menu.type';

async function getData(): Promise<BlogContentInterface[]> {
  const res = await ObsidianContentsByBlog();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  return res;  
}

export default async function Page(){
  const data = await getData();
  
  return (
      <ContainerLayout 
        children={
          <BlogContent data={data} />
        } 
        title={MenuType.BLOG} 
      />
  )
}
