import {
  ComponentProps,
  Dispatch,
  FC,
  PropsWithChildren,
  ReactNode,
  Ref,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import useMotionMeasure from 'react-use-motion-measure';
import { mergeRefs } from 'react-merge-refs';
import clsx from 'clsx';
import { useSnap } from '~/hooks';
import './index.css';

interface SwipeActionsContext {
  actionsWrapperInset: number;
  actionsWidth: number;
  setActionsWidth: Dispatch<SetStateAction<number>>;
  triggerRef: Ref<HTMLDivElement>;
  triggerHeight: MotionValue<number>;
  dragProps: ReturnType<typeof useSnap>['dragProps'];
  setOpen(open: boolean): void;
}

const SwipeActionsContext = createContext<SwipeActionsContext | null>(null);

/** https://sinja.io/blog/swipe-actions-react-framer-motion */
const useSwipeActionsContext = () => {
  const ctx = useContext(SwipeActionsContext);
  if (!ctx) throw new Error('SwipeActionsContext.Provider is missing');
  return ctx;
};

type SwipeActionsRootProps = {
  className?: string;
};
export const Root: FC<PropsWithChildren<SwipeActionsRootProps>> = ({
  children,
  className,
}) => {
  const [actionsWidth, setActionsWidth] = useState(0);
  const actionsWrapperInset = useMemo(() => 2, []);

  const handleRef = useRef<HTMLDivElement>(null);
  const [triggerMeasureRef, triggerBounds] = useMotionMeasure();
  const constraints = useMemo(
    () => ({
      right: 0,
      left: -actionsWidth - actionsWrapperInset,
    }),
    [actionsWidth, actionsWrapperInset],
  );
  const { dragProps, snapTo } = useSnap({
    direction: 'x',
    ref: handleRef,
    snapPoints: {
      type: 'constraints-box',
      points: [{ x: 0 }, { x: 1 }],
      unit: 'percent',
    },
    constraints,
    dragElastic: { right: 0.04, left: 0.04 },
    springOptions: {
      bounce: 0.2,
    },
  });

  const value = useMemo<SwipeActionsContext>(
    () => ({
      actionsWidth,
      setActionsWidth,
      triggerRef: mergeRefs([handleRef, triggerMeasureRef]),
      dragProps,
      triggerHeight: triggerBounds.height,
      actionsWrapperInset,
      setOpen: (open) => snapTo(open ? 0 : 1),
    }),
    [],
  );

  return (
    <SwipeActionsContext.Provider value={value}>
      <div className={clsx('relative', className)}>{children}</div>
    </SwipeActionsContext.Provider>
  );
};

interface SwipeActionsTriggerProps {
  className?: string;
}

const Trigger: FC<PropsWithChildren<SwipeActionsTriggerProps>> = ({
  children,
  className,
}) => {
  const { dragProps, triggerRef } = useSwipeActionsContext();

  return (
    <motion.div
      role="button"
      tabIndex={0}
      className={clsx('relative z-10', className)}
      ref={triggerRef}
      {...dragProps}
    >
      {children}
    </motion.div>
  );
};

type SwipeActionsActionsProps = {
  className?: string;
  wrapperClassName?: string;
};

const Actions: FC<PropsWithChildren<SwipeActionsActionsProps>> = ({
  children,
  className,
  wrapperClassName,
}) => {
  const { actionsWrapperInset, setOpen, triggerHeight, setActionsWidth } =
    useSwipeActionsContext();
  const actionsWrapperHeight = useTransform(
    triggerHeight,
    (v) => v - actionsWrapperInset,
  );
  const [actionsMeasureRef, actionsBounds] = useMotionMeasure();
  useMotionValueEvent(actionsBounds.width, 'change', setActionsWidth);

  return (
    <motion.div
      className={clsx(
        'absolute flex justify-end overflow-hidden',
        wrapperClassName,
      )}
      style={{ height: actionsWrapperHeight, inset: actionsWrapperInset }}
    >
      <motion.div
        className={clsx('h-full flex items-stretch', className)}
        ref={actionsMeasureRef}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

type SwipeActionActionsProps = ComponentProps<typeof motion.button>;

const Action: FC<SwipeActionActionsProps> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  const { setOpen } = useSwipeActionsContext();
  return (
    <motion.button
      className={clsx('action', className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          // 该属性用于检查是否已调用
          setOpen(false);
          (document.activeElement as HTMLElement | null)?.blur();
        }
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const SwipeActions = {
  Root,
  Trigger,
  Actions,
  Action,
};
