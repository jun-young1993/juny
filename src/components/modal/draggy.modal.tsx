import { Dialog } from 'primereact/dialog'
import {ReactNode, useEffect, useRef, useState} from 'react'
import HeaderGroupButton from '@/components/buttons/header-group.button'
import _IMAGE from "@/defined/image";
import Image from "next/image";
import {useDraggyModal} from "@/store/recoil/draggy-modal.recoil";
import {UnionsMenuType} from "@/types/menu.type";
import { useRouter } from 'next/navigation';
import { BlogPath } from '@/defined/blog.defined';


interface DraggyModalProps {
    menuType: UnionsMenuType
    children: ReactNode
    onMaximize?: () => void
}
export default function DraggyModal(props: DraggyModalProps) {
    const {isDraggyModal, removeDraggyModal} = useDraggyModal();
    
    
    const menuType = props.menuType;
    const isModal = isDraggyModal(menuType)
    
    return (
        <>
            <Dialog
                className='bg-slate-200 dark:bg-gray-800 rounded-lg'
                header={
                    <HeaderGroupButton
                        className='dark:bg-gray-800'
                        title={menuType}
                        onClose={() => removeDraggyModal(menuType)}
                        onMaximize={() => {
                            removeDraggyModal(menuType);
                            props?.onMaximize && props.onMaximize();
                        }}
                    />
                }
                maximized={false}
                visible={isModal}
                modal={false}
                closeIcon={<></>}
                style={{ width: '60vw', height: '50vh' }}
                onHide={() => removeDraggyModal(menuType)}
            >
                <div className='w-full h-full p-3'>
                    {props.children}
                </div>
            </Dialog>
        </>
    )
}
