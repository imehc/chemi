type IsNever<T> = [T] extends [never] ? true : false
type IsUnion<U> = IsNever<U> extends true ? "" : U
/**
 * 拼接字符串联合类型
 */
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${IsUnion<`_${E[number]}`>}${IsUnion<`-${M[number]}`>}`

type ClassNames1 = BEM<'btn', ['price'], []>
type ClassNames2 = BEM<'btn', ['price'], ['warning', 'success']>
type ClassNames3 = BEM<'btn', [], ['small', 'medium', 'large']>

/**
 * Pop
 */
type Pop<T extends unknown[]> = T extends [...infer Rest, infer R] ? [...Rest] : never

type res = Pop<[1, 2, 3]>

/**
 * Shift
 */
type Shift<T extends unknown[]> = T extends [infer R, ...infer Rest] ? [...Rest] : never

type res = Shift<[1, 2, 3]>


type TrimLeft<S extends string> = S extends `${' ' | '\t' | '\n'}${infer Rest}` ? TrimLeft<Rest> : S
type TrimRight<S extends string> = S extends `${infer Rest}${' ' | '\t' | '\n'}` ? TrimRight<Rest> : S
/**
 * Trim
 */
type Trim<S extends string> = TrimRight<TrimLeft<S>>

type res = Trim<'  ews    '>

/**
 * Replace
 */
type Replace<S extends string, F extends string, T extends string> = S extends `${infer L}${F}${infer R}` ? `${L}${T}${R}` : S

type res = Replace<"今天天气是晴天啊", "晴天", "阴天">

type Base = {
  max: string;
  min: string;
  range: string;
  age: number;
}

/**
 * 对象key添加前缀
 */
type Format<T extends keyof any, S extends string[]> = {
  [K in keyof T as `${S[number]}_${K & string}`]: T[K]
}

type Res = Format<Base, ["x", 'y']>


