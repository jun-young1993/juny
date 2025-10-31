import { headers } from 'next/headers'

/**
 * User-Agent 헤더를 기반으로 iOS 플랫폼인지 확인
 */
export async function isIOSPlatform(): Promise<boolean> {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''

  return /iPhone|iPad|iPod/i.test(userAgent)
}

/**
 * User-Agent 헤더를 기반으로 Android 플랫폼인지 확인
 */
export async function isAndroidPlatform(): Promise<boolean> {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''

  return /Android/i.test(userAgent)
}
