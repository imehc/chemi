import { MouseEventHandler, useCallback, useEffect, useRef } from 'react';
import type { HTMLAttributes } from 'react';

interface SliderProps extends HTMLAttributes<HTMLDivElement> {}

export const Slider: React.FC<SliderProps> = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderHandleRef = useRef<HTMLDivElement>(null);
  const sliderLeftDotRef = useRef<HTMLDivElement>(null);
  const sliderRightDotRef = useRef<HTMLDivElement>(null);
  const handleLeftSliderMove = useCallback((e: any) => {
    if (
      !sliderRef.current ||
      !sliderHandleRef.current ||
      !sliderLeftDotRef.current ||
      !sliderRightDotRef.current
    ) {
      return;
    }
    // const leftDotWidth = sliderLeftDotRef.current.clientWidth;
    // const rightDotWidth = sliderRightDotRef.current.clientWidth;
    // console.log('leftDotWidth', leftDotWidth);

    sliderHandleRef.current.onmousemove = (event) => {
      const leftDotWidth = sliderLeftDotRef.current!.clientWidth;
      const offsetLeft = sliderHandleRef.current!.offsetLeft;
      const { offsetX } = event;
      // console.log('clientWidth', clientWidth, offsetLeft);
      console.log('offsetX', offsetX);
      sliderHandleRef.current!.style.left = `${offsetX - leftDotWidth / 2}px`;
    };
    document.onmouseup = () => {
      sliderHandleRef.current!.onmousemove = null;
      sliderHandleRef.current!.onmousemove = null;
      sliderLeftDotRef.current!.onmousemove = null;
      sliderRightDotRef.current!.onmousemove = null;
    };
  }, []);
  useEffect(() => {
    console.log(sliderRef.current?.offsetLeft);
    console.log(sliderHandleRef.current?.offsetLeft);
  }, [sliderRef]);
  return (
    <div
      className="w-full h-4 bg-[#b0c0f2] rounded-[1rem] relative"
      ref={sliderRef}
    >
      <div
        className="absolute top-0 left-[20px] w-[200px] h-4 bg-[#f2d8b0] rounded-[1rem] transition duration-300 ease-in-out"
        ref={sliderHandleRef}
      >
        <div
          className="absolute left-0 top-1/2 translate-x-[-50%] translate-y-[-50%]"
          onMouseDown={handleLeftSliderMove}
          ref={sliderLeftDotRef}
        >
          <CustomHandle />
        </div>
        <div
          className="absolute right-0 top-1/2 translate-x-[50%] translate-y-[-50%]"
          ref={sliderRightDotRef}
        >
          <CustomHandle />
        </div>
      </div>
    </div>
  );
};

const CustomHandle: React.FC = () => {
  return <div className="w-[10px] h-[10px] rounded-[50%] bg-purple-500"></div>;
};
