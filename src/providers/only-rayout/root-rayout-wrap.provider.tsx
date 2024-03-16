'use client'

import { ReactNode, useEffect } from 'react'
import { ThemeType, useTheme } from '@/store/recoil/theme-mode.recoil'
import NavBar from '@/components/root/navbar'
import DraggyModal from '@/components/modal/draggy.modal'

export default function RootLayoutWrapProvider({
  children,
}: {
  children: ReactNode
}) {
  const { theme, setTheme } = useTheme()
  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  useEffect(() => {
    setTheme(isSystemDark ? ThemeType.DARK : ThemeType.LIGHT)
  }, [])

  useEffect(() => {
    document.body.classList.remove(
      theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT,
    )
    document.body.classList.add(theme)
  }, [theme])

  return (
    <main className="w-full min-h-screen">
      <NavBar />
      <div className={'h-full'}>{children}</div>
      <DraggyModal />
      <DraggyModal />
      <DraggyModal />
    </main>
  )
}
