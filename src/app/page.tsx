import HeaderGroupButton from '@/components/buttons/header-group.button'
import { GITHUB_OBSIDIAN_CONFIG } from '@/lib/config/config'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'


async function getData() {
  return [];
}

export default async function Page(){
  const data = await getData()
  
  return <div className='w-full h-full'>                
    main
  </div>
}
