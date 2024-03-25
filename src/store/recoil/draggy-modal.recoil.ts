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

export const draggyModalsSelector = selector<[] | UnionsMenuType[] | string[]>({
    key: 'draggyModalsSelector',
    get: () => []
});

export const draggyModalsAtom = atom<[] | UnionsMenuType[] | string[]>({
    key: 'draggyModalsAtom',
    default: draggyModalsSelector
});

export function usePushDraggyModal() {
    return useRecoilCallback(
        ({snapshot, set}) =>
            (menu: UnionsMenuType) => {
                const draggyModals = snapshot.getLoadable(draggyModalsAtom).getValue();
                const isDraggyModal = draggyModals.indexOf(menu) === -1 ? false : true;
                if(!isDraggyModal){
                    set(draggyModalsAtom,[...draggyModals, menu]);
                }
            }
    )
}

export function useDraggyModal(){
    const [draggyModals] = useRecoilState(draggyModalsAtom);

    return { draggyModals, usePushDraggyModal };
}



