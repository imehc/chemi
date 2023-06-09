import type { WaterWaveProps } from '.';

export type WareAnimationProps = {
  canvasWidth: number;
  canvasHeight: number;
} & Required<Omit<WaterWaveProps, 'value'>>;

export default class WareAnimation {
  config: WareAnimationProps;
  points: number[][];

  constructor(props: WareAnimationProps) {
    this.points = [];
    this.config = props;
  }

  getChartColor(ctx: CanvasRenderingContext2D) {
    const grd = ctx.createLinearGradient(0, 0, 0, this.config.canvasHeight);
    grd.addColorStop(0, this.config.waveColors[0]);
    grd.addColorStop(1, this.config.waveColors[1]);
    return grd;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    const points = this.points;
    ctx.beginPath();
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      ctx.lineTo(point[0], point[1]);
    }
    ctx.lineTo(this.config.canvasWidth, this.config.canvasHeight);
    ctx.lineTo(0, this.config.canvasHeight);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.fillStyle = this.getChartColor(ctx);
    ctx.fill();
    ctx.restore();
  }
  update({ currValue }: { currValue: number }) {
    this.points = []
    const {
      config: { waveHeight, waveWidth, canvasWidth, canvasHeight, initXOffset },
    } = this;
    for (let x = 0; x < canvasWidth; x += 0.25) {
      const y = Math.sin(x * waveWidth + initXOffset);
      const dY = canvasHeight * (1 - currValue / 100);
      this.points.push([x, dY + y * waveHeight]);
    }
    this.config.initXOffset += this.config.speed;
  }
}
