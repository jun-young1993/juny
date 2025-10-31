import { genPageMetadata } from 'app/seo'
import { getAppConfig } from 'lib/app-config/fetch'
import { isAndroidPlatform, isIOSPlatform } from 'lib/app-config/platform'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import Image from '@/components/Image'
import Link from '@/components/Link'

interface PageProps {
  params: Promise<{
    key: string
  }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { key } = await props.params
  const appConfig = await getAppConfig(key)

  return genPageMetadata({
    title: `${appConfig.displayName}`,
    description:
      appConfig.description +
      '\r\n' +
      `${appConfig.displayName} Download the app from App Store or Google Play.`,
    image: appConfig.appImageUrl ? appConfig.appImageUrl : undefined,
  })
}

export default async function Page(props: PageProps) {
  const { key } = await props.params
  const appConfig = await getAppConfig(key)

  if (appConfig.appStoreUrl && (await isIOSPlatform())) {
    redirect(appConfig.appStoreUrl)
  } else if (appConfig.googlePlayUrl && (await isAndroidPlatform())) {
    redirect(appConfig.googlePlayUrl)
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        {/* 앱 이미지 및 정보 */}
        <div className="mb-12 text-center">
          {appConfig.appImageUrl && (
            <div className="mb-6 flex justify-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-4 border-gray-200 shadow-xl dark:border-gray-700">
                <Image
                  src={appConfig.appImageUrl}
                  alt={appConfig.displayName}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-gray-100">
            {appConfig.displayName}
          </h1>
          {appConfig.description && (
            <p className="mx-auto max-w-lg text-lg text-gray-600 dark:text-gray-400">
              {appConfig.description}
            </p>
          )}
        </div>

        {/* 다운로드 안내 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <p className="mb-6 text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
            아래 링크를 눌러 앱을 설치해주세요
          </p>
          <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
            모바일 기기(iOS, Android)에서만 다운로드 및 설치가 가능합니다.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {/* iOS App Store */}
            {appConfig.appStoreUrl ? (
              <Link
                href={appConfig.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 rounded-xl border-2 border-gray-300 bg-white px-6 py-4 transition-all hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-400 dark:hover:bg-gray-600"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 dark:text-gray-400">다운로드</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    App Store
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="group flex cursor-not-allowed items-center justify-center gap-3 rounded-xl border-2 border-gray-300 bg-gray-100 px-6 py-4 opacity-60 dark:border-gray-600 dark:bg-gray-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-400 text-white">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 dark:text-gray-400">다운로드</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      App Store
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  현재 iOS 버전 링크 공유가 불가능한 상태입니다
                </p>
              </div>
            )}

            {/* Google Play Store */}
            {appConfig.googlePlayUrl ? (
              <Link
                href={appConfig.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 rounded-xl border-2 border-gray-300 bg-white px-6 py-4 transition-all hover:border-green-500 hover:bg-green-50 hover:shadow-lg dark:border-gray-600 dark:bg-gray-700 dark:hover:border-green-400 dark:hover:bg-gray-600"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L16.81,15.12L14.54,12.85L16.81,10.81L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 dark:text-gray-400">다운로드</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Google Play
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="group flex cursor-not-allowed items-center justify-center gap-3 rounded-xl border-2 border-gray-300 bg-gray-100 px-6 py-4 opacity-60 dark:border-gray-600 dark:bg-gray-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-400 text-white">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 dark:text-gray-400">다운로드</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Google Play
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  현재 안드로이드 버전 링크 공유가 불가능한 상태입니다
                </p>
              </div>
            )}
          </div>

          {/* 플랫폼별 안내 */}
          <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              {appConfig.appStoreUrl && (
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">iOS:</span>
                  <span>위 App Store 링크를 눌러 설치해주세요</span>
                </div>
              )}
              {appConfig.googlePlayUrl && (
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Android:</span>
                  <span>위 Google Play 링크를 눌러 설치해주세요</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
