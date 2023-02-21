import { useCallback, useEffect } from "react";
import { finalize, fromEvent, map, throttleTime } from "rxjs";

type Option = { targetX?: number; targetY?: number; targetRatio?: number };

/**
  大屏适配的 hooks
 */
export const useScalePage = (option?: Option) => {
  const triggerScale = useCallback(() => {
    // 1.设计稿的尺寸
    const targetX = option?.targetX || 1920;
    const targetY = option?.targetY || 1080;
    const targetRatio = option?.targetRatio || 16 / 9; // 宽高比率

    // 2.拿到当前设备(浏览器)的宽度
    const currentX =
      document.documentElement.clientWidth || document.body.clientWidth;
    const currentY =
      document.documentElement.clientHeight || document.body.clientHeight;

    // 3.计算缩放比例
    let scaleRatio = currentX / targetX; // 参照宽度进行缩放 ( 默认情况 )
    const currentRatio = currentX / currentY; // 宽高比率

    // 超宽屏
    if (currentRatio > targetRatio) {
      // 4.开始缩放网页
      scaleRatio = currentY / targetY; // 参照高度进行缩放
      document.body.setAttribute("width", `${targetX}px`);
      document.body.setAttribute("height", `${targetY}px`);
      document.body.setAttribute(
        "transform",
        `scale(${scaleRatio.toFixed(2)}) translateX(-50%)`
      );
      document.body.setAttribute("left", `50%`);
    } else {
      // 4.开始缩放网页
      document.body.setAttribute("width", `${targetX}px`);
      document.body.setAttribute("height", `${targetY}px`);
      document.body.setAttribute(
        "transform",
        `scale(${scaleRatio.toFixed(2)})`
      );
    }
  }, [option]);

  useEffect(() => {
    triggerScale(); // 动画缩放网页
    const task = fromEvent(window, "resize")
      .pipe(
        finalize(() => {
          window.removeEventListener("resize", triggerScale);
        }),
        throttleTime(300),
        map(() => triggerScale())
      )
      .subscribe();

    return () => {
      task.unsubscribe();
    };
  }, [triggerScale]);
};
