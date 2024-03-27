'use client'

import { ReactNode, useEffect } from 'react'
import { ThemeType, useTheme } from '@/store/recoil/theme-mode.recoil'
import NavBar from '@/components/root/navbar'
import DraggyModal from '@/components/modal/draggy.modal'
import MenuBar from '@/components/root/menu-bar'

export default function RootLayoutWrapProvider({
  children,
}: {
  children: ReactNode
}) {
  const { theme, setTheme } = useTheme();

  let isSystemDark = false;

  useEffect(() => {
    
    if(typeof window !== undefined){
      isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setTheme(isSystemDark ? ThemeType.DARK : ThemeType.LIGHT)
  }, [])

  useEffect(() => {
    document.body.classList.remove(
      theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT,
    )
    document.body.classList.add(theme)
  }, [theme])

  return (
    <>
    <header className='flex-none items-center justify-center'>
      <div className="container mx-auto">
        <NavBar />
      </div>
    </header>
    {/* className grow tailwind 작동 안함 */}
    <main className='flex justify-center' style={{
      flexGrow: 1
    }}>
      <div className='container mx-auto py-8'>
        {children}
      </div>
    </main>
    <footer className='flex-none items-center justify-center h-[15%]'>
      {/*<div className="container mx-auto opacity-0 h-full">*/}
        <MenuBar />
      {/*</div>*/}
    </footer>
  </>
  )
}
