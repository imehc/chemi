import React, { useState, type FC } from 'react';
import { ThreeDimensional, ThreeMap } from '~/components';
import { R3F } from '~/demo/R3F';

export const PageDashboard: FC = () => {
  const [localUrl, setLocalUrl] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      throw new Error('未选择文件');
    }
    setLocalUrl(window.URL.createObjectURL(file));
  };

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
