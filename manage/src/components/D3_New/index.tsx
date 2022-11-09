interface LineConfig<T, K> {
  key: string;
  getter: (d: T) => (k: K[]) => (k2: K) => number;
}

interface Props<T, K> {
  data: T;
  getX: Date[];
  lines: LineConfig<T, K>[];
  yLabel?: string;
  yUnitLabel?: string;
}

// 以 Material UI 的 break point 作为标准
// sm 为 600px, 一个图标占 6/12 位置即 300px 宽，留 20px 空间的空白，即 300 - 20 = 280px
//  https://mui.com/material-ui/customization/breakpoints/#default-breakpoints
const minWidth = 280;
const minHeight = 200;

export const LineChart2 = <T, K>({
  data,
  getX,
  lines,
  yLabel,
  yUnitLabel,
}: Props<T, K>): JSX.Element => {
 
  return <div></div>
};
