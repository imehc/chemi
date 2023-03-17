import React, { useCallback, useId, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

type CommonProperties = {
  title?: string;
  content?: string;
  icon?: string;
  cancelText?: string;
  confirmText?: string;
  /**
   * 点击蒙层是否允许关闭
   */
  maskCloseable?: boolean;
  isShowCancel?: boolean;
  isShowConfirm?: boolean;
  /**
   * 点击`cancel`回调
   */
  cancelCallbackFn?: () => void;
  /**
   * 点击`confirm`回调
   */
  confirmCallbackFn?: () => void;
};

type RenderModalProps = CommonProperties & { type: keyof IModalProps };

interface IModalProps {
  info: (props: CommonProperties) => void;
  success: (props: CommonProperties) => void;
  warn: (props: CommonProperties) => void;
  error: (props: CommonProperties) => void;
}

export const useModal = (): IModalProps => {
  const id = useId();

  const createNode = useCallback((): HTMLDivElement => {
    const node = document.getElementById(id);
    if (!node) {
      const newNode = document.createElement('div');
      newNode.setAttribute('id', id);
      return document.body.appendChild(newNode);
    }
    return document.body.appendChild(node) as HTMLDivElement;
  }, [id]);

  const renderModal = useCallback((props: RenderModalProps) => {
    const node = createNode();
    createRoot(node).render(<Modal node={node} {...props} />);
  }, []);

  return useMemo(
    () => ({
      info: (props) => renderModal({ ...props, type: 'info' }),
      success: (props) => renderModal({ ...props, type: 'success' }),
      warn: (props) => renderModal({ ...props, type: 'warn' }),
      error: (props) => renderModal({ ...props, type: 'error' }),
    }),
    [renderModal]
  );
};

interface ModalProps extends CommonProperties {
  node?: HTMLDivElement;
  type?: keyof IModalProps;
}

const Modal: React.FC<ModalProps> = ({
  type,
  title,
  content,
  icon,
  cancelText = '取消',
  confirmText = '确定',
  maskCloseable = true,
  isShowCancel = true,
  isShowConfirm = false,
  cancelCallbackFn,
  confirmCallbackFn,
  node,
}): JSX.Element => {
  const close = useCallback(() => {
    if (!node) {
      return;
    }
    document.body.removeChild(node);
  }, []);

  return (
    <div
      className="w-screen h-screen backdrop-filter backdrop-blur fixed left-0 top-0 bg-[rgba(49,52,56,.24)]"
      onClick={() => maskCloseable && close()}
    >
      <div
        className="absolute left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%] w-[356px] h-[420px] bg-orange-50 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            confirmCallbackFn?.();
            close();
          }}
        >
          确定
        </button>
        <button
          onClick={() => {
            cancelCallbackFn?.();
            close();
          }}
        >
          取消
        </button>
      </div>
    </div>
  );
};
