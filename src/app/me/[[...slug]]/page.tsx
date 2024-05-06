
import Profile from "@/components/common/profile";
import ContainerLayout from "@/components/layouts/container.layouts";
import {BlogContentInterface} from "@/types/blog.type";
import {API_URL} from "@/lib/config/config";
import {BlogPath} from "@/defined/blog.defined";
import {MutiSegmentSlugPageParams} from "@/types/next.type";
import _ from "lodash";

async function getData(path?: string): Promise<BlogContentInterface[]> {
    const dynamicPath = path ? path : 'blog/Resume/jun-young.md';

    const res = await fetch(API_URL(`/${dynamicPath}`), {
        method: 'GET',
        next: { revalidate: 3600 }
    });

    const result = await res.json();

    return result;
}
export default async function Page({ params }:MutiSegmentSlugPageParams){
    const path = params.slug
        ? _.join(params.slug,'/')
        : undefined;
    console.log("=>(page.tsx:27) path", path);
    const data = await getData(path);

    return (
        <ContainerLayout>
            <Profile
                data={data}
            />
        </ContainerLayout>
    );
}