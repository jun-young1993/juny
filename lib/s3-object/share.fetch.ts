import { isWeblogError } from 'lib/weblog/type-guards'
import { SharedMediaGroupResponse } from './types'
import { notFound } from 'next/navigation'

function getEndpoint() {
  // Server (RSC/route handlers): call upstream directly with absolute URL
  if (typeof window === 'undefined') {
    const apiUrl = process.env.API_URL
    if (!apiUrl) throw new Error('Missing API_URL env var')
    return `${apiUrl.replace(/\/$/, '')}/s3-object-shares`
  }

  // Client: use same-origin proxy (API_URL is not exposed to browser)
  return `/api/s3-object-shares`
}

interface SharedMediaGroupFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  cache?: RequestCache
  tags?: string[]
  query?: string
}

async function sharedMediaGroupFetch<T>({
  method = 'GET',
  cache = 'force-cache',
  tags,
  query = '',
}: SharedMediaGroupFetchOptions): Promise<{ status: number; body: T } | never> {
  try {
    const endpoint = getEndpoint()
    const result = await fetch(`${endpoint}${query ? `${query}` : ''}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(tags && { next: { tags } }),
      cache: cache,
      credentials: 'include',
    })

    const body = await result.json()

    if (body.errors) {
      throw body.errors[0]
    }

    return {
      status: result.status,
      body,
    }
  } catch (error) {
    if (isWeblogError(error)) {
      throw {
        cause: error.cause?.toString() || 'unknown',
        status: error.status || 500,
        message: error.message,
      }
    }
    throw error
  }
}

export async function getSharedMediaGroup(
  id: string,
  skip: number = 0,
  take: number = 10
): Promise<SharedMediaGroupResponse> {
  const result = await sharedMediaGroupFetch<SharedMediaGroupResponse>({
    method: 'GET',
    cache: 'no-store',
    query: `/${id}?skip=${skip}&take=${take}`,
  })

  if (result.status === 404) {
    notFound()
  }
  return result.body
}

export async function getSharedSingleFetch(id: string): Promise<SharedMediaGroupResponse> {
  const result = await sharedMediaGroupFetch<SharedMediaGroupResponse>({
    method: 'GET',
    cache: 'no-store',
    query: `/object/${id}`,
  })
  if (result.status === 404) {
    notFound()
  }
  return result.body
}
