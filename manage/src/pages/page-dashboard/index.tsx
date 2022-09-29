import React from 'react';
import PixiBasic from '~/components/component-pixi/BasicPixi';
import {
  // ExampleBabyLon1,
  ExampleBabyLon3,
} from '~/components/component-babylon/index';
import CesiumMap from '~/components/component-cesium/Map';

export const PageDashboard: React.FC = () => {
  return (
    <React.Fragment>
      {/* <PixiBasic /> */}
      {/* <ExampleBabyLon3 /> */}
      <CesiumMap/>
    </React.Fragment>
  );
};
export default PageDashboard;
