import HeaderGroupButton from '@/components/buttons/header-group.button';
import { ObsidianContentsByBlog } from '@/lib/client/obsidian.client';
import { GITHUB_OBSIDIAN_CONFIG } from '@/lib/config/config'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'


async function getData() {
  const res = await ObsidianContentsByBlog();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 

  return res.json();
  
}

export default async function Page(){
  const data = await getData()
  console.log(data);
  return <div className='w-full h-full'>    
      <HeaderGroupButton
        onClose={() => {}}
        onMaximize={() => {}}
        onMinimize={() => {}}
      />
  </div>
}
