import React, { useState } from 'react';
import { useScalePage } from '~/hooks';
import { WaterWare } from '~/components';

export const PageDashboard: React.FC = () => {
  useScalePage();
  const [init, update] = useState('80%');
  return (
    <React.Fragment>
      {/* <MultiInput /> */}
      {/* <ScrollContainer2 className='w-72 h-72 bg-orange-300' maskColor='#ed4444' maskHeight={100}>
        <div className='w-full h-40'>1</div>
        <div className='w-full h-40'>2</div>
        <div className='w-full h-40'>3</div>
        <div className='w-full h-40'>4</div>
        <div className='w-full h-40'>5</div>
      </ScrollContainer2> */}
      <div className="w-[200px] h-[300px] mt-5">
        <WaterWare value={50} />
      </div>
    </React.Fragment>
  );
};

export default PageDashboard;
