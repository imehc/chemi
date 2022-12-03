import * as d3 from 'd3';
import { useEffect, useState } from 'react';

interface Props<T> {
  data: T[][];
}

export const RadarChart = <T,>({ data }: Props<T>): JSX.Element => {
  const [container, setContainer] = useState<HTMLDivElement | null>();

  console.log(data)

  useEffect(() => {
    if (!container) {
      return;
    }
  }, []);

  return <div ref={setContainer}>1</div>;
};
