import React from 'react';
import { useScalePage } from '~/hooks';

export const PageDashboard: React.FC = () => {
  useScalePage();
  return (
    <React.Fragment>
      {/* gap-4每个之间的间距 */}
      {/* <div className="h-64 grid grid-cols-4 gap-4">
        <div className="bg-yellow-500">1</div>
        <div className="bg-blue-500">3</div>
        <div className="bg-green-500">5</div>
        <div className="bg-pink-500">7</div>
        <div className="bg-orange-500">9</div>
      </div> */}
      <div className='shadow'>111</div>
      <div className="h-64 grid grid-cols-1 gap-0 bg-[#aaa] auto-cols-auto">
        <div className="bg-yellow-500 h-10 text-sm">1</div>
        <div className="bg-blue-500 h-10 text-sm">3</div>
        <div className="bg-green-500 h-10 text-sm">5</div>
        {/* <div className="bg-orange-500">9</div> */}
      </div>
    </React.Fragment>
  );
};

export default PageDashboard;
