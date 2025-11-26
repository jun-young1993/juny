import { isWeblogError } from 'lib/weblog/type-guards'
import { SharedMediaGroupResponse } from './types'

const endpoint = `${process.env.API_URL}/s3-object-shares`

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

export async function getSharedMediaGroup(id: string): Promise<SharedMediaGroupResponse> {
  const result = await sharedMediaGroupFetch<SharedMediaGroupResponse>({
    method: 'GET',
    cache: 'no-store',
    query: `/${id}`,
  })
  return result.body
}
