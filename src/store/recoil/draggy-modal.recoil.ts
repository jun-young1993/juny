import {atom, selector, useRecoilCallback, useRecoilState} from "recoil";
import {MenuType, UnionsMenuType} from "@/types/menu.type";

export const draggyModalSelector = selector<null>({
    key: 'draggyModalSelector',
    get: () => null
});

export const draggyModalAtom = atom<null>({
    key: 'draggyModalAtom',
    default: draggyModalSelector
});

export const draggyModalsSelector = selector<[] | UnionsMenuType[]>({
    key: 'draggyModalsSelector',
    get: () => []
});

export const draggyModalsAtom = atom<[] | UnionsMenuType[]>({
    key: 'draggyModalsAtom',
    default: draggyModalsSelector
});

export function useIsDraggyModal(){
    return useRecoilCallback(
        ({snapshot, set}) =>
            (menu: UnionsMenuType) => {
                const draggyModals = snapshot.getLoadable(draggyModalsAtom).getValue();
                const isDraggyModal = draggyModals.indexOf(menu);
                return isDraggyModal === -1 ? false : true;
            }
    )
}

export function usePushDraggyModal() {
    const isDraggyModal = useIsDraggyModal();
    return useRecoilCallback(
        ({snapshot, set}) =>
            (menu?: UnionsMenuType) => {
                const draggyModals = snapshot.getLoadable(draggyModalsAtom).getValue();
                if(menu && !isDraggyModal(menu)){
                    set(draggyModalsAtom,[...draggyModals, menu]);
                }
            }
    )
}

export function useRemoveDraggyModal(){
    const isDraggyModal = useIsDraggyModal();
    return useRecoilCallback(
        ({snapshot, set}) =>
            (menu: UnionsMenuType) => {
                const draggyModals = snapshot.getLoadable(draggyModalsAtom).getValue();
                if(isDraggyModal(menu)){
                    const removeDraggyModals = draggyModals.filter((draggyModal) => draggyModal !== menu);
                    set(draggyModalsAtom,[...removeDraggyModals]);

                }
            }
    )
}

export function useDraggyModal(){
    const [draggyModals] = useRecoilState(draggyModalsAtom);
    const pushDraggyModal = usePushDraggyModal();
    const isDraggyModal = useIsDraggyModal();
    const removeDraggyModal = useRemoveDraggyModal();
    return { draggyModals,  pushDraggyModal, isDraggyModal, removeDraggyModal};
}



