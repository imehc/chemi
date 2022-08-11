import Slider from 'rc-slider';
import Range from 'rc-slider';
import 'rc-slider/assets/index.css';
import Handle from 'rc-slider/lib/Handles/Handle';
import { useCallback } from 'react';

export const SliderDemo = () => {
  const log = useCallback((r: any) => {
    console.log(r, 'log');
  }, []);
  return (
    <>
      {/* <Range className='w-50 h-8' min={0} max={50}/> */}
      <p>draggableTrack two points</p>
      <div className="w-[500px]">
        <Slider
          className="w-full h-5"
          range
          allowCross={false}
          defaultValue={[0, 40]}
          min={0}
          max={50}
          draggableTrack
          railStyle={{
            // backgroundColor: '#f4f6fc',
            backgroundColor: '#e8b295',
            height: '15px',
            borderRadius: '15px',
          }}
          trackStyle={{
            backgroundColor: '#6070F3',
            height: '15px',
          }}
          handleRender={(handleProps: any) => {
            return (
              <Handle {...handleProps}>
                <div className="w-[25px] h-[25px] rounded-[50%] bg-purple-500"></div>
              </Handle>
            );
          }}
          onChange={log}
        />
      </div>
    </>
  );
};
