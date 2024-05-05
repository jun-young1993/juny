
import Profile from "@/components/common/profile";
import ContainerLayout from "@/components/layouts/container.layouts";
import {BlogContentInterface} from "@/types/blog.type";
import {API_URL} from "@/lib/config/config";
import {BlogPath} from "@/defined/blog.defined";
import MarkDownPreview from "@/components/markdown/mark-down";

async function getData(path?: string): Promise<BlogContentInterface[]> {
    const dynamicPath = path ? path : '/Resume/jun-young.md';

    const res = await fetch(API_URL(`${BlogPath}/${dynamicPath}`), {
        method: 'GET',
        next: { revalidate: 3600 }
    });

    const result = await res.json();

    return result;
}
export default async function Page(){
    const data = await getData();

    return (
        <ContainerLayout>
            <Profile data={data}/>
        </ContainerLayout>
    );
}