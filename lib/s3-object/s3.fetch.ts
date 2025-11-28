import { isWeblogError } from 'lib/weblog/type-guards'
import { S3Object } from './types'

const endpoint = `${process.env.API_URL}/aws/s3/objects`

interface SharedMediaGroupFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  cache?: RequestCache
  tags?: string[]
  query?: string
}

async function s3ObjectFetch<T>({
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

export async function findS3Object(id: string): Promise<S3Object | null> {
  const result = await s3ObjectFetch<S3Object>({
    method: 'GET',
    cache: 'no-store',
    query: `?id=${id}`,
  })
  return result.body ?? null
}
