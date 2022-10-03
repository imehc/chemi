import {
  forwardRef,
  HTMLAttributes,
  LegacyRef,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';

export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  pointId?: string;
  title?: string;
}
// 子组件方法
export interface PopupHandler {
  defaultSetting: () => void;
}

const _Popup: ForwardRefRenderFunction<PopupHandler, PopupProps> = (
  props,
  ref
): JSX.Element => {
  const { pointId, title, ...rest } = props;
  console.log("--------------")
  console.log(pointId, title);
  console.log("--------------")

  const defaultSetting = useCallback((): void => {
    console.log('defaultSetting...');
  }, []);
  useImperativeHandle(ref, () => ({
    defaultSetting,
  }));
  return <div {...rest}>我是弹框</div>;
};

export const Popup = forwardRef(_Popup);
