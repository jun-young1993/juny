import { NextRequest, NextResponse } from 'next/server'

function buildUpstreamUrl(pathname: string, search: string) {
  const apiUrl = process.env.API_URL
  if (!apiUrl) throw new Error('Missing API_URL env var')
  const base = apiUrl.replace(/\/$/, '')
  const cleanedPath = pathname.replace(/^\/+/, '')
  return `${base}/s3-object-shares/${cleanedPath}${search}`
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  try {
    const { path } = await context.params
    const upstreamUrl = buildUpstreamUrl(path.join('/'), request.nextUrl.search)

    const response = await fetch(upstreamUrl, {
      method: 'GET',
      headers: {
        // forward cookies for auth if upstream needs it
        cookie: request.headers.get('cookie') ?? '',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    const body = await response.text()
    return new NextResponse(body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') ?? 'application/json',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: (error as Error)?.message ?? 'proxy error' }, { status: 500 })
  }
}
