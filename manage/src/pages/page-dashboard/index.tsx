import React from 'react';
import PixiBasic from '~/components/component-pixi/BasicPixi';
import {
  // ExampleBabyLon1,
  ExampleBabyLon2,
} from '~/components/component-babylon/index';

export const PageDashboard: React.FC = () => {
  return (
    <React.Fragment>
      {/* <PixiBasic /> */}
      <ExampleBabyLon2 />
    </React.Fragment>
  );
};
export default PageDashboard;
