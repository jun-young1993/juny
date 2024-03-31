import BlogContent from '@/components/contents/blog.content';
import ContainerLayout from '@/components/layouts/container.layouts';
import { BlogContentInterface } from '@/types/blog.type';
import { MenuType } from '@/types/menu.type';
import {API_URL} from "@/lib/config/config";
import _ from "lodash"

type Params = {
    slug?: [] | string[]
}

async function getData(path?: string): Promise<BlogContentInterface[]> {
    const dynamicPath = path ? path : '';

  const res = await fetch(API_URL(`/blog/${dynamicPath}`),{
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
    console.log("=>(page.tsx:32) data", data);

  return (
      <ContainerLayout
        children={
          <BlogContent
              data={data}
              path={path ?? ''}
          />
        }
        title={MenuType.BLOG}
        path={path ?? 'blog'}
      />
  )
}
