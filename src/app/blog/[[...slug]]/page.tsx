import BlogContent from '@/components/contents/blog.content';
import ContainerLayout from '@/components/layouts/container.layouts';
import { BlogContentInterface } from '@/types/blog.type';
import { MenuType } from '@/types/menu.type';
import {API_URL} from "@/lib/config/config";
import _ from "lodash"
import { BlogPath } from '@/defined/blog.defined';
import { MutiSegmentSlugPageParams } from '@/types/next.type';
import { BlogContentMenuNav } from '@/components/blog/blog-content-menu-nav';

async function getData(path?: string): Promise<BlogContentInterface[]> {
    const dynamicPath = path ? path : '';
  
  const res = await fetch(API_URL(`${BlogPath}/${dynamicPath}`), {
      method: 'GET',
      next: { cache: 'no-store' }
  });

  const result = await res.json();

  return result;
}

export default async function Page({ params }:MutiSegmentSlugPageParams){
    const path = params.slug
        ? _.join(params.slug,'/')
        : undefined;
    const data = await getData(
        path
    );
    

  return (
      <ContainerLayout
        type={MenuType.BLOG}
        title={(
          <>
          <span className='mini:hidden'>{MenuType.BLOG}</span>
          <BlogContentMenuNav 
              data={data}
              path={path ?? ''}
           />
          </>
        )}
      >
        <BlogContent
              data={data}
              path={path ?? ''}
          />
      </ContainerLayout>
  )
}
