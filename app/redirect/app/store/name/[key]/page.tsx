import { genPageMetadata } from 'app/seo'
import { getAppConfig } from 'lib/app-config/fetch'
import { isAndroidPlatform, isIOSPlatform } from 'lib/app-config/platform'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    'app-name': string
  }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { 'app-name': appName } = await props.params
  const appConfig = await getAppConfig(appName)

  return genPageMetadata({
    title: `${appConfig.displayName}`,
    description:
      appConfig.description ||
      `${appConfig.displayName} Download the app from App Store or Google Play.`,
    image: appConfig.appImageUrl ? appConfig.appImageUrl : undefined,
  })
}

export default async function Page(props: PageProps) {
  const { 'app-name': appName } = await props.params
  const appConfig = await getAppConfig(appName)

  if (appConfig.appStoreUrl && (await isIOSPlatform())) {
    redirect(appConfig.appStoreUrl)
  } else if (appConfig.googlePlayUrl && (await isAndroidPlatform())) {
    redirect(appConfig.googlePlayUrl)
  }

  return <div>Redirecting to {appName}</div>
}
