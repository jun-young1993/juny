'use client'
import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cookies, headers } from 'next/headers'
import { MeOperation } from 'lib/weblog/types'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

type Props = {
  items: ReactNode[]
  children: ReactNode
}
const FloatingActionUserButton = ({ children, items }: Props) => {
  const pathname = usePathname()
  const isIgnoreFloatingActionButton = pathname === '/post/create'

  return (
    <div
      className={`group fixed bottom-8 right-8 flex h-24 w-24 items-end justify-end p-2 ${isIgnoreFloatingActionButton && 'hidden'}`}
    >
      {/* 메인 버튼 */}
      <input type="checkbox" id="fab-toggle" className="peer hidden" />
      <label
        htmlFor="fab-toggle"
        className="absolute z-50 flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-3 text-white shadow-xl transition-transform peer-checked:rotate-45"
      >
        {children}
      </label>

      {/* 서브 버튼 1 */}
      {items[0] && (
        <div className="absolute flex scale-0 rounded-full bg-green-300 p-2 text-white transition-all duration-300 ease-out hover:bg-green-400 hover:p-3 peer-checked:-translate-x-16 peer-checked:scale-100">
          {items[0]}
        </div>
      )}

      {/* 서브 버튼 2 */}
      {items[1] && (
        <div className="absolute flex scale-0 rounded-full bg-blue-300 p-2 text-white transition-all duration-300 ease-out hover:bg-blue-400 hover:p-3 peer-checked:-translate-y-16 peer-checked:scale-100">
          {items[1]}
        </div>
      )}

      {/* 서브 버튼 3 */}
      {items[3] && (
        <div className="absolute flex scale-0 rounded-full bg-yellow-300 p-2 text-white transition-all duration-300 ease-out hover:bg-yellow-400 hover:p-3 peer-checked:-translate-x-14 peer-checked:-translate-y-14 peer-checked:scale-100">
          {items[3]}
        </div>
      )}
    </div>
  )
}

export default FloatingActionUserButton
