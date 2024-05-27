import React, { useState, type FC } from 'react';
import { SelectModel, ThreeDimensional, ThreeMap } from '~/components';
import { R3F } from '~/demo/R3F';
import Band from '~/demo3/02';

export const PageDashboard: FC = () => {
  return (
    <React.Fragment>
      {/* <div className="h-[400px] m-10 w-[600px]"> */}
      <div className="fixed h-screen left-0 top-0 w-screen">
        {/* <PreviewModel url={localUrl} /> */}
        {/* <TheatreDemo /> */}
        {/* <ThreeDimensional /> */}
        {/* <ThreeMap /> */}
        <R3F />
      </div>
      {/* <MultipleView /> */}
      {/* <input
        type="file"
        accept="model/gltf-binary,.glb,.gltf"
        onChange={handleFileChange}
      /> */}
    </React.Fragment>
  );
};

export default PageDashboard;
