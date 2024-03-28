import { Dialog } from 'primereact/dialog'
import {ReactNode, useEffect, useRef, useState} from 'react'
import HeaderGroupButton from '@/components/buttons/header-group.button'
import _IMAGE from "@/defined/image";
import Image from "next/image";
import {useDraggyModal} from "@/store/recoil/draggy-modal.recoil";
import {UnionsMenuType} from "@/types/menu.type";


interface DraggyModalProps {
    menuType: UnionsMenuType
    children: ReactNode
}
export default function DraggyModal(props: DraggyModalProps) {
    const {isDraggyModal, removeDraggyModal} = useDraggyModal();
    const [maximized, setMaximized] = useState<boolean>(false);

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
                        onMaximize={() => setMaximized(true)}
                        onMinimize={() => setMaximized(false)}
                    />
                }
                maximized={maximized}
                visible={isModal}
                modal={false}
                closeIcon={<></>}
                style={{ width: '50vw' }}
                onHide={() => removeDraggyModal(menuType)}
            >
                <div className='w-full h-full p-3'>
                    {props.children}
                </div>
            </Dialog>
        </>
    )
}
