import React, { type FC } from 'react';
import { ThreeDemo01 } from '~/components';

export const PageDashboard: FC = () => {
  return (
    <React.Fragment>
      {/* <div
        className="animate-bounce-alt animate-duration-1s animate-count-infinite i-twemoji-frog"
        m="10"
        text="36px"
        display="inline-block"
      /> */}
      <ThreeDemo01 />
    </React.Fragment>
  );
};

export default PageDashboard;
