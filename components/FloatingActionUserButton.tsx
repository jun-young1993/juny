"use client"
import {ReactNode, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {cookies, headers} from "next/headers";
import { MeOperation } from "lib/weblog/types";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type Props  = {
    items: ReactNode[]
    children: ReactNode
}
const FloatingActionUserButton = ({ children, items }: Props) => {
    
    const pathname = usePathname();
    const isIgnoreFloatingActionButton = pathname === "/post/create";

    
    return (
            <div className={`group fixed bottom-8 right-8 p-2 flex items-end justify-end w-24 h-24 ${isIgnoreFloatingActionButton && 'hidden'}`}>
                {/* 메인 버튼 */}
                <input
                    type="checkbox"
                    id="fab-toggle"
                    className="peer hidden"
                />
                <label
                    htmlFor="fab-toggle"
                    className="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute cursor-pointer transition-transform peer-checked:rotate-45"
                >
                    {children}
                </label>

                {/* 서브 버튼 1 */}
                {
                    items[0] &&
                    <div
                        className="absolute rounded-full transition-all duration-300 ease-out scale-0 peer-checked:scale-100 peer-checked:-translate-x-16 flex p-2 hover:p-3 bg-green-300 hover:bg-green-400 text-white"
                    >
                        {items[0]}
                    </div>
                }


                {/* 서브 버튼 2 */}
                {
                    items[1] &&
                    <div
                        className="absolute rounded-full transition-all duration-300 ease-out scale-0 peer-checked:scale-100 peer-checked:-translate-y-16 flex p-2 hover:p-3 bg-blue-300 hover:bg-blue-400 text-white"
                    >
                        {items[1]}
                    </div>
                }


                {/* 서브 버튼 3 */}
                {
                    items[3] &&
                    <div
                        className="absolute rounded-full transition-all duration-300 ease-out scale-0 peer-checked:scale-100 peer-checked:-translate-y-14 peer-checked:-translate-x-14 flex p-2 hover:p-3 bg-yellow-300 hover:bg-yellow-400 text-white"
                    >
                        {items[3]}
                    </div>
                }

            </div>
    );
};

export default FloatingActionUserButton;