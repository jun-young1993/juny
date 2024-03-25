import {Unions} from "@/types/union.type";

export const MenuType = {
    GITHUB : 'GITHUB'
} as const;

export type UnionsMenuType = typeof MenuType[keyof typeof MenuType];