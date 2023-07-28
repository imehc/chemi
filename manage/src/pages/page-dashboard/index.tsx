import React, { useState, type FC } from 'react';
import { PreviewModel, ThreeAxesHelper } from '~/components';

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
      <div className="m-10 h-[400px] w-[600px]">
        <PreviewModel url={localUrl} />
      </div>
      {/* <MultipleView /> */}
      <input
        type="file"
        accept="model/gltf-binary,.glb,.gltf"
        onChange={handleFileChange}
      />
    </React.Fragment>
  );
};

export default PageDashboard;
