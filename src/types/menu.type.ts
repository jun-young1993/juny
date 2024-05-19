export const MenuType = {
    GITHUB : 'github',
    BLOG: 'blog',
    CALENDAR: 'calendar',
    ME: 'me',
    GUEST_BOOK: 'guest-book'

} as const;

export type UnionsMenuType = typeof MenuType[keyof typeof MenuType];