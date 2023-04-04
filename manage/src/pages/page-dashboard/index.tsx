import React, { type FC } from 'react';

export const PageDashboard: FC = () => {
  console.log('current env name: ', import.meta.env.VITE_NAME);

  return (
    <React.Fragment>
      <div
        className="animate-bounce-alt animate-duration-1s animate-count-infinite i-twemoji-frog"
        m="10"
        text="36px"
        display="inline-block"
      />
    </React.Fragment>
  );
};

export default PageDashboard;
