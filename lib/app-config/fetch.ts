import { isWeblogError } from 'lib/weblog/type-guards'
import { AppConfig } from './types'

const endpoint = `${process.env.API_URL}/app-config`

interface AppConfigFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  cache?: RequestCache
  tags?: string[]
  query?: string
}

async function appConfigFetch<T>({
  method = 'GET',
  cache = 'force-cache',
  tags,
  query = '',
}: AppConfigFetchOptions): Promise<{ status: number; body: T } | never> {
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

export async function getAppConfig(appKey: string): Promise<AppConfig> {
  const result = await appConfigFetch<AppConfig>({
    method: 'GET',
    cache: 'no-store',
    query: `/${appKey}`,
  })
  return result.body
}
