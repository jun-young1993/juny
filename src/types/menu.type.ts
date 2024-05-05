export const MenuType = {
    GITHUB : 'github',
    BLOG: 'blog',
    CALENDAR: 'calendar',
    ME: 'me'

} as const;

export type UnionsMenuType = typeof MenuType[keyof typeof MenuType];