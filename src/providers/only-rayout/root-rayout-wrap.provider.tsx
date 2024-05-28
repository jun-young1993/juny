'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { ThemeType, useTheme } from '@/store/recoil/theme-mode.recoil'
import NavBar from '@/components/root/navbar'
import MenuBar from '@/components/root/menu-bar'
import { usePathname } from 'next/navigation'
import {StyleThemeProvider} from 'juny-react-style';

export default function RootLayoutWrapProvider({
  children,
}: {
  children: ReactNode
}) {
  const { theme, setTheme } = useTheme();
  
  let isSystemDark = useRef(false);
  const pathname = usePathname();
  const isRoot: boolean = pathname === '/';
  useEffect(() => {

    if(typeof window !== undefined){
      isSystemDark.current = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setTheme(isSystemDark.current ? ThemeType.DARK : ThemeType.LIGHT)
  }, [setTheme])

  useEffect(() => {
    document.body.classList.remove(
      theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT,
    )
    document.body.classList.add(theme)
  }, [theme])
  
  return (
    <StyleThemeProvider
      mode={theme}
    >
      <div className='flex flex-col h-full'>
      <header className={`flex-none items-center justify-center ${isRoot ? '' : 'mini:hidden medium:block'}`}>
        <div className="w-full">
          <NavBar />
        </div>
      </header>
      {/* className grow tailwind 작동 안함 */}
      <main className='flex justify-center h-full' style={{
        flexGrow: 1,
        height: '80%'
      }}>
        <div className='w-full h-full py-2 mini:py-1'>
          {children}
        </div>
      </main>
      <footer className={`flex-none items-center justify-center h-[15%] ${isRoot ? '' : 'mini:hidden medium:block'}`}>
        {/*<div className="container mx-auto opacity-0 h-full">*/}
          <MenuBar />
        {/*</div>*/}
      </footer>
    </div>
  </StyleThemeProvider>
  )
}
