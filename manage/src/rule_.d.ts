//  大佬的版本
type Base = {
  max: string;
  min: string;
  range: string;
};

/**
 * 对象key
 */
type ArrToStr<T extends string[]> = T extends [infer first, ...infer reset]
  ? first extends string
  ? reset extends string[]
  ? `${first}_${ArrToStr<reset>}`
  : ""
  : ""
  : "";

type Format<T, K extends string[]> = {
  [P in keyof T as `${ArrToStr<K>}${P & string}`]: T[P];
};

type b = Format<Base, ["x", "y"]>;
