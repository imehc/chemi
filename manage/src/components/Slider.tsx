import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Handle from 'rc-slider/lib/Handles/Handle';
// import './slider.css';
import { useCallback, useEffect } from 'react';

const startIndex = 5;
const endIndex = 20;
const min = 0;
const max = 50;
const handleUpdate = (v: number[]) => {
  console.log(v, 'v');
};

const marks = {
  // 0: {
  //   style: {
  //     color: '#f2d8b0',
  //   },
  //   label: <p className="mt-2">Zero</p>,
  // },
  // 10: <p className="mt-2 text-purple-400">One</p>,
  // 20: <p className="mt-2 text-orange-400">Two</p>,
  // 30: <p className="mt-2 text-green-400">Three</p>,
  // 40: <p className="mt-2 text-pink-400">Four</p>,
  // 50: <p className="mt-2 text-blue-400">Five</p>,
};
// 随机生成一种颜色
const randomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = Number(Math.floor(Math.random()).toFixed(1));
  return `${r},${g},${b},${a}`;
};

// 创建指定个数的数组方法1
const newArr = [...Array(50)].map((_, i) => i);
console.log(newArr, 'newArr');

// 创建指定个数的数组方法2
const forMarks = Array.from({ length: max }, (v, k) => k)
  .filter((v) => v % 10 === 0)
  .map((v, i) => {
    return {
      value: v,
      label: <p className="mt-2 text-pink-400">{v}</p>,
    };
  })
  .concat([
    {
      value: max,
      label: <p className="mt-2 text-blue-400">{max}</p>,
    },
  ])
  .concat([
    {
      value: min,
      label: <p className="mt-2 text-purple-400">{min}</p>,
    },
  ]);

const newMarks = forMarks.reduce((res, item, i) => {
  console.log(res, 'res');
  return { ...res, [item.value]: item.label };
}, {});

console.log(forMarks, 'forMarks');

const css = `
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color : transparent;
    box-shadow : none;
  }
`;

export const SliderDemo = () => {
  // useEffect(() => {
  //   const rsHandle = document.getElementsByClassName('rc-slider-handle')[0];
  //   console.log(rsHandle, 'rsHandle');
  //   // if(rsHandle.getAttribute('.rc-slider-handle-dragging') ){
  //   if (rsHandle.getAttribute('rc-slider-handle-1')) {
  //     // rsHandle.removeAttribute('rc-slider-handle-dragging')
  //     rsHandle.removeAttribute('rc-slider-handle-1');
  //   }
  // }, []);
  return (
    <>
      {/* <Range className='w-50 h-8' min={0} max={50}/> */}
      <p>draggableTrack two points</p>
      <div className="w-[500px]">
        <style>{css}</style>
        <Slider
          range
          allowCross={false}
          defaultValue={[startIndex, endIndex]}
          min={min}
          max={max}
          draggableTrack
          dotStyle={{ display: 'none' }}
          marks={newMarks}
          railStyle={{
            backgroundColor: '#f4f6fc',
            height: 15,
            borderRadius: 15,
          }}
          trackStyle={{
            backgroundColor: '#6070F3',
            height: 15,
            boxShadow: '3px 3px 3px 3px rgba(216, 216, 216,0.5)',
          }}
          handleStyle={{
            opacity: 1,
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            height: 36,
            width: 36,
            // transform: 'translate(-15px, -5px)',
            transform: 'translate(-15px)',
          }}
          handleRender={(state) => {
            return (
              <Handle {...state.props}>
                <div className="w-5 h-5 bg-purple-400 rounded"></div>
              </Handle>
            );
          }}
          onChange={(val) => handleUpdate(val as number[])}
        />
      </div>
    </>
  );
};
