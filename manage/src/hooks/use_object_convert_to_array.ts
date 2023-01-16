import { getUnixTime, isEqual } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';

type IReplaceKey<O = unknown> = NonNullable<O[keyof O]> extends (infer A)[]
  ? keyof A extends string
  ? keyof A
  : never
  : never;

interface ConvertFromObjectProps<O = unknown> {
  data?: O;
  /**
   * 对象下级对象数组的key
   */
  replaceKey?: IReplaceKey<O>;
  /**
   * 合并指定key相同的项
   */
  mergeKey?: IReplaceKey<O>;
}

type IOriginResult<O = unknown> = NonNullable<O[keyof O]> extends (infer A)[]
  ? A extends Record<string, unknown>
  ? A
  : never
  : never;

// TODO: 返回值类型推断
type IToArrayResult<
  O = unknown,
  K = IReplaceKey<O>,
  T = number | null | undefined
> = Omit<
  IOriginResult<O>,
  K extends 'value' ? (K extends string ? K : never) : 'value'
> &
  Record<keyof O, T>;

/**
 * 将对象转换为数组，值为Object的key
 * @example
 * {
 *  prev: [
 *     { date: new Date('2023-01-01 13:13:13'), count: 20 },
 *     { date: new Date('2023-01-01 14:15:13'), count: 21 },
 *   ],
 * cur: [
 *    { date: new Date('2023-01-01 12:15:13'), count: 60 },
 *    { date: new Date('2023-01-01 14:15:13'), count: 61 },
 *  ],
 * last: null,
 * }
 * =========================convert=========================
 * [
 *  { date: new Date('2023-01-01 12:15:13'), prev: 20 },
 *  { date: new Date('2023-01-01 13:13:13'), prev: 60 },
 *  { date: new Date('2023-01-01 14:15:13'), prev: 21, cur: 61 },
 * ]
 */
const useObjectConvertToArray = <
  O = unknown,
  K = 'value',
  T = number | null | undefined
>({
  data,
  replaceKey = 'value' as IReplaceKey<O>,
  mergeKey,
}: ConvertFromObjectProps<O>): IToArrayResult<O, K, T>[] => {
  const [resultArray, setResultArray] = useState<IToArrayResult<O, K, T>[]>([]);

  const convertToArray = useCallback(
    (
      cData: NonNullable<O>[Extract<keyof NonNullable<O>, string>],
      key: Extract<keyof NonNullable<O>, string>,
      replaceKey: K
    ): IToArrayResult<O, K, T>[] => {
      // Object.prototype.toString.call(cData).slice(-8, -1)
      if (Array.isArray(cData)) {
        return cData.map((item) => {
          const oItem = { ...item, [key]: item[replaceKey] };
          delete oItem[replaceKey];
          return oItem;
        }) as IToArrayResult<O, K, T>[];
      }
      return [] as IToArrayResult<O, K, T>[];
    },
    []
  );

  const getObjectKey = useCallback((): void => {
    if (!resultArray.length) {
      let r: IToArrayResult<O, K, T>[] = [];
      for (const k in data) {
        if (Object.prototype.hasOwnProperty.call(data, k)) {
          if (data[k] !== null && data[k] !== undefined) {
            const rArray = convertToArray(data[k], k, replaceKey);
            if (rArray.length) {
              r = [...r, ...rArray];
            }
          }
        }
      }
      if (r.length) {
        setResultArray(r);
      }
      return;
    }
  }, [convertToArray, data, replaceKey, resultArray]);

  const mergeSameItem = useCallback(
    (
      rArray: IToArrayResult<O, K, T>[],
      mergeKey: IReplaceKey<O>
    ): IToArrayResult<O, K, T>[] => {
      if (!rArray.length) return [];
      // TODO: 合并相同项到一个项
      let mergeArray: IToArrayResult<O, K, T>[] = [];

      for (const i in rArray) {
        if (Object.prototype.hasOwnProperty.call(rArray, i)) {
          const idx = mergeArray.findIndex((item) => {
            if ((rArray[i][mergeKey] as unknown) instanceof Date) {
              return isEqual(rArray[i][mergeKey], item[mergeKey]);
            }
            if (typeof rArray[i][mergeKey] === 'number') {
              return rArray[i][mergeKey] === item[mergeKey];
            }
            return -1;
          });
          if (idx === -1) {
            mergeArray = [...mergeArray, rArray[i]];
          }
        }
      }

      return mergeArray
        .map((item) => {
          const fArray = rArray.filter((item2) => {
            if ((item[mergeKey] as unknown) instanceof Date) {
              return isEqual(item[mergeKey], item2[mergeKey]);
            }
            if (typeof item[mergeKey] === 'number') {
              return item[mergeKey] === item2[mergeKey];
            }
            return false;
          });
          if (fArray.length > 1) {
            let fItem = {} as IToArrayResult<O, K, T>;
            for (const i in fArray) {
              if (Object.prototype.hasOwnProperty.call(fArray, i)) {
                fItem = { ...fItem, ...fArray[i] };
              }
            }
            if (!Object.getOwnPropertyNames(fItem).length) {
              return item;
            }
            return fItem;
          }
          return item;
        })
        .sort((a, b) => {
          if ((a[mergeKey] as unknown) instanceof Date) {
            return getUnixTime(a[mergeKey]) - getUnixTime(b[mergeKey]);
          }
          return a[mergeKey] - b[mergeKey];
        });
    },
    []
  );

  useEffect(() => {
    if (!data) return;
    getObjectKey();
  }, [data, getObjectKey, resultArray.length]);

  return useMemo(() => {
    if (mergeKey) {
      return mergeSameItem(resultArray, mergeKey);
    }
    return resultArray;
  }, [mergeKey, resultArray, mergeSameItem]);
};

export { useObjectConvertToArray };
