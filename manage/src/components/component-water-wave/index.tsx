import { Component, createRef, ReactNode } from 'react';
import WaveAnimation, { type WareAnimationProps } from './wave-animation';
export interface WaterWaveProps {
  /**
   * 水波的所处的位置 取值范围 0 - 100
   */
  value: number;
  /**
   * @default ["#3a81dd","#32a1e6"]
   * 水波的颜色
   */
  waveColors?: [string, string];
  /**
   * 水波波纹的宽度，数越小越宽
   * @default 0.04
   */
  waveWidth?: number;
  /**
   * 水波波纹的宽度，数越大越高
   * @default 4
   */
  waveHeight?: number;
  /**
   * 水波的流动速度，数越大越高越快
   * @default 0.04
   */
  speed?: number;
  /**
   * 初始偏移
   * @default 0
   */
  initXOffset?: number;
}

export class WaterWare extends Component<WaterWaveProps> {
  static defaultProps: Omit<WaterWaveProps, 'value'>;
  canvasRef: ReturnType<typeof createRef<HTMLCanvasElement>>;
  canvas!: HTMLCanvasElement;
  startValue: number = 0;
  wave!: WaveAnimation;

  constructor(props: Required<WaterWaveProps>) {
    super(props);
    this.draw = this.draw.bind(this);
    this.canvasRef = createRef<HTMLCanvasElement>();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    canvas.width = (canvas.parentNode as HTMLElement).offsetWidth;
    canvas.height = (canvas.parentNode as HTMLElement).offsetHeight;
    this.canvas = canvas;

    this.wave = new WaveAnimation({
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      waveWidth: this.props.waveWidth,
      waveHeight: this.props.waveHeight,
      waveColors: this.props.waveColors,
      speed: this.props.speed,
      initXOffset: this.props.initXOffset,
    } as WareAnimationProps);
    this.draw();
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const value = this.props.waveHeight
      ? this.props.value - this.props.waveHeight / 2
      : this.props.value;
    if (this.startValue <= value) {
      this.startValue += 1;
    }
    if (this.startValue > value) {
      this.startValue -= 1;
    }

    this.wave.update({
      currValue: this.startValue,
    });
    this.wave.draw(ctx);
    window.requestAnimationFrame(this.draw);
  }

  render(): ReactNode {
    return <canvas ref={this.canvasRef} />;
  }
}

WaterWare.defaultProps = {
  waveColors: ['#3ADD74', '#77de9b'],
  waveWidth: 0.04,
  waveHeight: 4,
  speed: 0.04,
  initXOffset: 0,
};
