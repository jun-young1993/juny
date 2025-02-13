import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import {getPost} from "../../../lib/weblog";
import {MDXRemote} from "next-mdx-remote/rsc";

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata | undefined> {
  const params = await props.params

  return;
  // return {
  //   title: post.title,
  //   description: post.summary,
  //   openGraph: {
  //     title: post.title,
  //     description: post.summary,
  //     siteName: siteMetadata.title,
  //     locale: 'en_US',
  //     type: 'article',
  //     publishedTime: publishedAt,
  //     modifiedTime: modifiedAt,
  //     url: './',
  //     images: ogImages,
  //     authors: authors.length > 0 ? authors : [siteMetadata.author],
  //   },
  //   twitter: {
  //     card: 'summary_large_image',
  //     title: post.title,
  //     description: post.summary,
  //     images: imageList,
  //   },
  // }
}



export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const {slug: id} = await props.params
  const postData = await getPost({
    id: id
  })

  if (!postData) {
    return notFound()
  }

  const { title, content} = postData

  return (
      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
        <div className="text-2xl">{title}</div>
        <hr/>
        <MDXRemote source={content} />
      </div>
  )
}
