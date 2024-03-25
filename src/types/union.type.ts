export type Union<T> = T[keyof T];
export type Unions<T> = Union<typeof T>;