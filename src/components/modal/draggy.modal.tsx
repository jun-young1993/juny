import { Dialog } from 'primereact/dialog'
import { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import HeaderGroupButton from '@/components/buttons/header-group.button'

export default function DraggyModal() {
  const [visible, setVisible] = useState<boolean>(false)
  const [maximized, setMaximized] = useState<boolean>(false);
  const [dialogKey, setDialogKey] = useState<number>(1);
  useEffect(() => {
    
    setDialogKey(dialogKey+1);
  },[maximized])
  
  return (
    <>
      <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        className='bg-white dark:bg-gray-800'
        header={
          <HeaderGroupButton 
            onClose={() => setVisible(false)}
            onMaximize={() => setMaximized(true)}
            onMinimize={() => setMaximized(false)}
          />
        }
        maximized={maximized}
        visible={visible}
        modal={false}
        closeIcon={<></>}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
    </>
  )
}
