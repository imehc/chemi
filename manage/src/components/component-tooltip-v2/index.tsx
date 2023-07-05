import React, { useRef, useState } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
  arrow,
  FloatingArrow,
} from '@floating-ui/react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const ToolTip2: React.FC<Props> = ({ content, children }) => {
  const arrowRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = useId();

  return (
    <div>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <StyledDiv
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            {content}
            <FloatingArrow
              ref={arrowRef}
              context={context}
              fill="#fff"
              strokeWidth={0.5}
              stroke="rgba(0, 0, 0, 0.2)"
            />
          </StyledDiv>
        </FloatingFocusManager>
      )}
      <button ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </button>
    </div>
  );
};

const StyledDiv = styled.div`
  min-width: 80px;
  padding: 17px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  background: #fff;
`;
