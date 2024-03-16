import { atom, selector, useRecoilCallback, useRecoilState } from 'recoil'

export enum ThemeType {
  DARK = 'dark',
  LIGHT = 'light',
}

export const themeSelector = selector<ThemeType>({
  key: 'themeSelector',
  get: () => ThemeType.LIGHT,
})

export const themeAtom = atom<ThemeType>({
  key: 'themeAtom',
  default: themeSelector,
})

export function useTheme() {
  const [theme] = useRecoilState(themeAtom)

  const setTheme = useRecoilCallback(
    ({ snapshot, set }) =>
      (theme: ThemeType) => {
        const currentTheme = snapshot.getLoadable(themeAtom).getValue()
        if (currentTheme !== theme) {
          set(themeAtom, theme)
        }
      },
    [],
  )

  const toggle = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const currentTheme = snapshot.getLoadable(themeAtom).getValue()
        set(
          themeAtom,
          ThemeType.LIGHT === currentTheme ? ThemeType.DARK : ThemeType.LIGHT,
        )
      },
    [],
  )

  return { theme, setTheme, toggle }
}
