'use client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import EditableTitleBox from '@/components/EditableTitleBox'
import { useEffect, useRef, useState } from 'react'
import FloatingActionButton from '@/components/FloatingActionButton'
import { Tag } from '../../../lib/weblog/types'
import { createPost, getPostTags } from '../../../lib/weblog'
import TagField from '@/components/TagField'
import toast from 'react-hot-toast'
import { MDXEditorMethods } from '@mdxeditor/editor'
const InitializeMDXEditor = dynamic(
  () => import('@/components/InitializeMDXEditor').then((mod) => mod.default),
  { ssr: false }
)

export default function Page() {
  const markdown = `
    Hello **world**!
    `
  const router = useRouter()
  const editorRef = useRef<MDXEditorMethods | null>(null)
  const [editable] = useState(true)
  const [title, setTitle] = useState('Title Box')
  const [tags, setTags] = useState<Tag[] | []>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([]) // 선택된 태그 상태
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getPostTags().then((fetchTags) => {
      setTags(fetchTags)
    })
  }, []) // 빈 배열로 초기 렌더 시 한 번만 호출
  const validate = () => {
    if (!title) {
      throw new Error('Title is required. Please provide a title.')
    }
    if (selectedTags.length === 0) {
      throw new Error('At least one tag must be selected.')
    }
    if (editorRef.current && !editorRef.current!.getMarkdown()) {
      throw new Error('Content is required. Please write something.')
    }
  }

  const handlePostSubmit = () => {
    try {
      if (isLoading) {
        return false
      }
      setIsLoading(true)
      validate()

      toast
        .promise(
          () => {
            return createPost({
              input: {
                tagIds: selectedTags,
                title: title,
                content: editorRef.current!.getMarkdown(),
              },
            })
          },
          {
            loading: 'Creating your blog post... Please wait.',
            success: 'Blog post created successfully!',
            error: (error) => error.message,
          }
        )
        .then(({ id }) => {
          router.push(`/blog/${id}`)
        })
    } catch (error) {
      toast.error(error.toString())
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={'h-full w-full'}>
      <EditableTitleBox editable={editable} title={title} onChange={(value) => setTitle(value)} />
      <TagField tags={tags} onSelectTags={setSelectedTags} />
      <InitializeMDXEditor ref={editorRef} markdown={markdown} />
      <FloatingActionButton onAdd={() => handlePostSubmit()} />
    </div>
  )
}
