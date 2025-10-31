import { getAppConfig } from 'lib/app-config/fetch'
import { isAndroidPlatform, isIOSPlatform } from 'lib/app-config/platform'
import { redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{
    'app-name': string
  }>
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
