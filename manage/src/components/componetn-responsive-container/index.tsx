/**
 * @fileOverview Wrapper component to make charts adapt to the size of parent * DOM
 */
 import clsx from "clsx";
 import {
   ReactElement,
   forwardRef,
   cloneElement,
   useState,
   useImperativeHandle,
   useRef,
   useEffect,
   useCallback,
   useMemo,
 } from "react";
 import ReactResizeDetector from "react-resize-detector";
 
 export interface Props {
   aspect?: number;
   width?: string | number;
   height?: string | number;
   minWidth?: string | number;
   minHeight?: string | number;
   maxHeight?: number;
   children: ReactElement;
   debounce?: number;
   id?: string | number;
   className?: string | number;
 }
 
 interface State {
   containerWidth: number;
   containerHeight: number;
 }
 
 export const ResponsiveContainer = forwardRef(
   (
     {
       aspect,
       width = "100%",
       height = "100%",
       minWidth,
       minHeight,
       maxHeight,
       children,
       debounce = 0,
       id,
       className,
     }: Props,
     ref
   ) => {
     const [sizes, setSizes] = useState<State>({
       containerWidth: -1,
       containerHeight: -1,
     });
     const containerRef = useRef<HTMLDivElement>(null);
     useImperativeHandle(ref, () => containerRef, [containerRef]);
 
     const [mounted, setMounted] = useState<boolean>(false);
 
     const isPercent = useCallback(
       (value: string | number) =>
         typeof value == "string" && value.indexOf("%") === value.length - 1,
       []
     );
 
     const getContainerSize = useCallback(() => {
       if (!containerRef.current) {
         return null;
       }
 
       return {
         containerWidth: containerRef.current.clientWidth,
         containerHeight: containerRef.current.clientHeight,
       };
     }, []);
 
     const debounceFn = useCallback((fn: VoidFunction, delay: number) => {
       class Debounced {
         public use = (
           func: Function,
           delay: number,
           immediate: boolean = false
         ): VoidFunction => {
           let timer: NodeJS.Timeout;
           return (...args: any) => {
             if (immediate) {
               func.apply(this, args);
               immediate = false;
               return;
             }
             clearTimeout(timer);
             timer = setTimeout(() => {
               func.apply(this, args);
             }, delay);
           };
         };
       }
       return new Debounced().use(fn, delay);
     }, []);
 
     const updateDimensionsImmediate = useCallback(() => {
       if (!mounted) {
         return;
       }
       const newSize = getContainerSize();
 
       if (newSize) {
         const { containerWidth: oldWidth, containerHeight: oldHeight } = sizes;
         const { containerWidth, containerHeight } = newSize;
 
         if (containerWidth !== oldWidth || containerHeight !== oldHeight) {
           setSizes({ containerWidth, containerHeight });
         }
       }
     }, [getContainerSize, mounted, sizes]);
 
     const handleResize = useMemo(
       () =>
         debounce > 0
           ? debounceFn(updateDimensionsImmediate, debounce)
           : updateDimensionsImmediate,
       [debounce, debounceFn, updateDimensionsImmediate]
     );
 
     const renderChart = useCallback(() => {
       const { containerWidth, containerHeight } = sizes;
 
       if (containerWidth < 0 || containerHeight < 0) {
         return null;
       }
 
       let calculatedWidth: number = isPercent(width)
         ? containerWidth
         : (width as number);
       let calculatedHeight: number = isPercent(height)
         ? containerHeight
         : (height as number);
 
       if (aspect && aspect > 0) {
         // Preserve the desired aspect ratio
         if (calculatedWidth) {
           // Will default to using width for aspect ratio
           calculatedHeight = calculatedWidth / aspect;
         } else if (calculatedHeight) {
           // But we should also take height into consideration
           calculatedWidth = calculatedHeight * aspect;
         }
 
         // if maxHeight is set, overwrite if calculatedHeight is greater than maxHeight
         if (maxHeight && calculatedHeight > maxHeight) {
           calculatedHeight = maxHeight;
         }
       }
 
       return cloneElement(children, {
         width: calculatedWidth,
         height: calculatedHeight,
       });
     }, [aspect, children, height, isPercent, maxHeight, sizes, width]);
 
     useEffect(() => {
       if (mounted) {
         const size = getContainerSize();
 
         if (size) {
           setSizes(size);
         }
       }
     }, [getContainerSize, mounted]);
 
     useEffect(() => {
       setMounted(true);
     }, []);
 
     const style = { width, height, minWidth, minHeight, maxHeight };
 
     return (
       <ReactResizeDetector
         handleWidth
         handleHeight
         onResize={handleResize}
         targetRef={containerRef}
       >
         <div
           {...(id != null ? { id: `${id}` } : {})}
           className={clsx("responsive-container", className)}
           style={style}
           ref={containerRef}
         >
           {renderChart()}
         </div>
       </ReactResizeDetector>
     );
   }
 );
 