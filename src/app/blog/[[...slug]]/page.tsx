import BlogContent from '@/components/contents/blog.content';
import ContainerLayout from '@/components/layouts/container.layouts';
import { BlogContentInterface } from '@/types/blog.type';
import { MenuType } from '@/types/menu.type';
import {API_URL} from "@/lib/config/config";
import _ from "lodash"
import { BlogPath } from '@/defined/blog.defined';

interface Params {
  params: {
    slug?: [] | string[]
  }
}

async function getData(path?: string): Promise<BlogContentInterface[]> {
    const dynamicPath = path ? path : '';
  console.log('page.tsx:17',API_URL(`${BlogPath}/${dynamicPath}`));
  const res = await fetch(API_URL(`${BlogPath}/${dynamicPath}`),{
      method: 'GET',
       next: { tags: dynamicPath.split('/') }
  });  

  const result = await res.json();

  return result;
}

export default async function Page({ params }:Params){
    const path = params.slug
        ? _.join(params.slug,'/')
        : undefined;
    const data = await getData(
        path
    );
    

  return (
      <ContainerLayout
        children={
          <BlogContent
              data={data}
              path={path ?? ''}
          />
        }
        type={MenuType.BLOG}
        title={MenuType.BLOG}
      />
  )
}
