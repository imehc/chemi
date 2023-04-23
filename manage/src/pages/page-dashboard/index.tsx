import React from 'react';
import { ScrollContainer2 } from '~/components';
import { useScalePage } from '~/hooks';

export const PageDashboard: React.FC = () => {
  useScalePage();
  return (
    <React.Fragment>
      {/* <MultiInput /> */}
      <ScrollContainer2 className='w-72 h-72 bg-orange-300' maskColor='#ed4444' maskHeight={100}>
        <div className='w-full h-40'>1</div>
        <div className='w-full h-40'>2</div>
        <div className='w-full h-40'>3</div>
        <div className='w-full h-40'>4</div>
        <div className='w-full h-40'>5</div>
      </ScrollContainer2>
    </React.Fragment>
  );
};

export default PageDashboard;
