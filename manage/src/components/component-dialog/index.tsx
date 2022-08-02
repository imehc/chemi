import React, { useEffect, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { createPortal } from 'react-dom';

// 可以传递className，style，和其他属性
interface StyleProps extends HTMLAttributes<HTMLDivElement> {}

interface Props extends StyleProps {
  visible: boolean;
  /**点击遮罩层关闭 */
  clickMask?: boolean;
  children: ReactNode;
  onClose?: () => void;
}
export const CustomDialog: React.FC<Props> = ({
  visible,
  clickMask = true,
  children,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);
  return createPortal(
    <React.Fragment>
      {isVisible && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-[999] bg-[rgba(202,203,205,.9)]"
          onClick={() => {
            if (clickMask && onClose) {
              onClose();
            }
          }}
        >
          <div
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {children}
          </div>
        </div>
      )}
    </React.Fragment>,
    document.body
  );
};
