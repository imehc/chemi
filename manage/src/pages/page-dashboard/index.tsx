import React, { type FC } from 'react';
import { ThreeDemo01 } from '~/components';
import { ThreeAxesHelper } from '~/components/componet-axes-helper';

export const PageDashboard: FC = () => {
  return (
    <React.Fragment>
      <ThreeAxesHelper />
    </React.Fragment>
  );
};

export default PageDashboard;
