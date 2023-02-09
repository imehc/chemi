import { FC, useId } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '..';

interface Props {
  visible?: boolean;
  onClose?: (result: boolean) => void;
  onSubmit?: (result: boolean) => void;
}

/**
 * 未完成❎
 */
export const Dialog2: FC<Props> = ({ visible = false, onClose, onSubmit }) => {
  const id = useId();
  return visible
    ? createPortal(
        <div
          id={id}
          className="fixed top-0 left-0 w-screen h-screen bg-[rgba(204,246,239,0.3)]"
        >
          <div className="absolute left-1/2 top-1/2 translate-1/2 w-40 h-24 bg-purple-200 flex flex-col justify-center items-center rounded-lg">
            <Button theme="contained" onClick={() => onSubmit?.(true)}>
              点我确认
            </Button>
            <Button
              theme="contained"
              color="delete"
              onClick={() => onClose?.(false)}
            >
              点我取消
            </Button>
          </div>
        </div>,
        document.body
      )
    : null;
};
