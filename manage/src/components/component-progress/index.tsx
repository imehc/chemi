import { useCallback, useEffect, useRef } from 'react';
import type { ProgressProps } from './type';

type DrawType = 'base' | 'progress';

export const Progress: React.FC<ProgressProps> = (props) => {
  const {
    value,
    color = '#b0daed',
    baseColor = '#e9eef4',
    round,
    indicator,
    ...otherProps
  } = props;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref) return;
    beganDraw();
  }, []);
  const beganDraw = useCallback(() => {
    const canvas = ref.current! as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const { width, height } = props;
    const indicatorHeight = 20;
    if (indicator) {
      canvas.height = height + indicatorHeight;
    }
    if (ctx) {
      const h = indicator ? indicatorHeight : 0;
      if (round) {
        fillRoundRect(0, h, width, height, height / 2, 'base', baseColor, ctx);
        fillRoundRect(0, h, width, height, height / 2, 'progress', color, ctx);
      } else {
        fillReact(0, h, width, height, 'base', baseColor, true, ctx);
        fillReact(0, h, width, height, 'progress', color, true, ctx);
      }
    }
  }, []);
  // 绘制填充矩形
  const fillReact = useCallback(
    (
      x: number,
      y: number,
      width: number,
      height: number,
      type: DrawType,
      colorOptions: string | string[],
      isfillRect: boolean,
      ctx: CanvasRenderingContext2D
    ) => {
      const w = handleCurrentProgress(value, width, type);
      if (colorOptions instanceof Array) {
        // 水平渐变
        const gr = ctx.createLinearGradient(0, 0, w, 0);
        colorOptions.forEach((c, i, b) =>
          gr.addColorStop(handleTransfromValue(i, b.length), c)
        );
        ctx.fillStyle = gr;
      } else {
        ctx.fillStyle = colorOptions;
      }
      isfillRect && ctx.fillRect(0, 0, w, height);
    },
    []
  );
  // 归一化 [0-1]
  const handleTransfromValue = useCallback((i: number, l: number) => {
    // n = (x - min) / (max - min);
    return parseFloat((i / (l - 1)).toFixed(2));
  }, []);
  // 处理当前进度所在的距离
  const handleCurrentProgress = useCallback(
    (v: number, width: number, type: DrawType) =>
      type === 'base' ? width : (v / 100) * width,
    []
  );
  // 绘制带圆角的填充矩形
  const fillRoundRect = useCallback(
    (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number,
      type: DrawType,
      colorOptions: string | string[],
      ctx: CanvasRenderingContext2D
    ) => {
      //圆的直径必然要小于矩形的宽高
      if (2 * radius > width || 2 * radius > height) {
        return false;
      }
      ctx.save();
      ctx.translate(x, y);
      const w = handleCurrentProgress(value, width, type);
      //绘制圆角矩形的各个边
      drawRoundRectPath(w, height, radius, ctx);
      fillReact(x, y, width, height, type, colorOptions, false, ctx);
      // ctx.fillStyle='red'
      ctx.fill();
      ctx.restore();
    },
    []
  );
  // 绘制带圆角的矩形
  const drawRoundRectPath = useCallback(
    (
      width: number,
      height: number,
      radius: number,
      ctx: CanvasRenderingContext2D
    ) => {
      ctx.beginPath();
      //从右下角顺时针绘制，弧度从0到1/2PI
      ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
      //矩形下边线
      ctx.lineTo(radius, height);
      //左下角圆弧，弧度从1/2PI到PI
      ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
      //矩形左边线
      ctx.lineTo(0, radius);
      //左上角圆弧，弧度从PI到3/2PI
      ctx.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);
      //上边线
      ctx.lineTo(width - radius, 0);
      //右上角圆弧
      ctx.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);
      //右边线
      ctx.lineTo(width, height - radius);
      ctx.closePath();
    },
    []
  );
  return <canvas {...otherProps} ref={ref} />;
};
