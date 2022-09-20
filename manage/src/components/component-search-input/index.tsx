import styled from '@emotion/styled';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BehaviorSubject,
  concatMap,
  debounceTime,
  defer,
  map,
  scan,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { useStatic } from '~/hooks';

export const useSearchInputWithDeviceSN = () => {
  const [deviceSN, setSn] = useState<string | null>();
  const [errReason, setErrReason] = useState<string>();

  const setDeviceSN = useCallback((sn?: string | null) => {
    setSn(sn);
    setErrReason(sn == null ? '这是一个错误❌信息' : undefined);
  }, []);

  return {
    deviceSN,
    errReason,
    setDeviceSN,
  };
};
interface Props {
  onChange?: (v: string | null | undefined) => void;
  valid?: boolean;
}

export const SearchInput: React.FC<Props> = ({ onChange, valid = true }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [resultKey, setResultKey] = useState<string | null | undefined>(
    undefined
  );

  const [total, setTotal] = useState<number>(0);
  const [options, setOptions] = useState<readonly []>([]); // 为Promise返回的类型

  const [isLoading, setIsLoading] = useState(false);
  const onChangeRef = useStatic(onChange);
  const loadMore$ = useMemo(() => new BehaviorSubject(true), []);

  const input$ = useMemo(() => new Subject<string>(), []);
  useEffect(() => {
    if (!false) {
      // 不满足条件退出
      return;
    }

    const task = input$
      .pipe(
        tap((v) => {
          setResultKey(v);
          onChangeRef.current?.call(null, v);
        }),
        debounceTime(300),
        tap(() => {
          setOptions([]);
        }),
        switchMap((v) => {
          return loadMore$.pipe(
            map((_, page) => page * 10),
            concatMap((skip) => {
              setIsLoading(true);
              return defer(() => {
                return new Promise(() => 1);
                // return Promise Http 请求
              }).pipe(
                tap({
                  complete: () => {
                    setIsLoading(false);
                  },
                  next: (res) => {
                    // 可设置Promise返回的总数，如果有
                    // setTotal(1)
                  },
                }),
                scan((acc, res) => {
                  // return [...acc, ...res.data]; // 追加数据
                }, [] as any) // 为Promise返回的类型
              );
            })
          );
        })
      )
      .subscribe((data) => {
        setOptions(data);
      });
    return () => task.unsubscribe();
  }, [input$, loadMore$, onChangeRef]);

  const handleScroll = useCallback(
    (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target;
      if (scrollTop + clientHeight === scrollHeight) {
        if (options.length < total) {
          loadMore$.next(true);
        }
      }
    },
    [loadMore$, options.length, total]
  );

  return (
    <ClickAwayListener onClickAway={() => setVisible(false)}>
      <div className="relative">
        <Input
          className={clsx(
            'w-full h-8 px-2 rounded-[8px] border-[1px] border-solid outline-none bg-[#f4f6fc]',
            { 'border-[#ecedf0]': !valid },
            { 'border-[#ff4f58]': valid }
          )}
          value={resultKey ?? ''}
          onFocus={() => setVisible(true)}
          onChange={(e) => input$.next(e.target.value)}
          placeholder="这是一个🔍"
        />
        {visible && options.length > 0 && (
          <div
            className="absolute top-8 left-0 w-full rounded-[8px] p-1 overflow-y-scroll text-base max-h-[6rem] bg-[rgba(255,255,255,.9)] border-[1px] border-solid border-[#ececec] z-50"
            onScroll={(e) => handleScroll(e)}
          >
            {isLoading && (
              <div className="h-6 text-sm flex justify-center items-center">
                loading...
              </div>
            )}
            {options.map((o,i) => (
              <div
                className="h-6 text-sm truncate"
                key={i}
                onClick={() => {
                  // setResultKey(1);// 设置最终点击的值
                  setOptions([]);
                  setVisible(false);
                }}
              >
                {/* {暂时的数据} */}
              </div>
            ))}
            {!isLoading && options.length === total && (
              <div className="h-6 text-sm flex justify-center items-cente">
                暂无更多
              </div>
            )}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

const Input = styled.input`
  ::-webkit-input-placeholder {
    font-size: 14px;
  }
`;
