import {API_URL} from "@/lib/config/config";
import {MetadataRoute} from "next";

async function getData(){
    const res = await fetch(API_URL('/obsidian/repos/trees/sitemap'),{
        method: 'GET',
        next: { revalidate: 3600 }
    })
    const result = await res.json();
    return result;
}

export default async function sitemap({id}: {id: number}) : Promise<MetadataRoute.Sitemap>{

    const data = await getData();
    console.log("=>(page.tsx:16) data", data);
    return data;
}