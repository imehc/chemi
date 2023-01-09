import { useCallback, useMemo, useRef } from "react";
import { BehaviorSubject, Subject } from "rxjs";

export const useSubject = <T = unknown>(): [Subject<T>, (val: T) => void] => {
  const subject = useMemo(() => new Subject<T>(), []);
  const handler = useCallback(
    (val: T) => {
      subject.next(val);
    },
    [subject]
  );
  return [subject, handler];
};

export const useBehaviorSubject = <T = unknown>(
  init: T
): [BehaviorSubject<T>, (val: T) => void] => {
  const initRef = useRef(init);
  const subject = useMemo(() => new BehaviorSubject<T>(initRef.current), []);
  const handler = useCallback(
    (val: T) => {
      subject.next(val);
    },
    [subject]
  );
  return [subject, handler];
};
