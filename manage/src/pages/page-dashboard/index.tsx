import React, { useRef, type FC, useEffect } from 'react';
import {
  TileMapServiceImageryProvider,
  Viewer,
  ImageryLayer,
  buildModuleUrl,
} from 'cesium';
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css';

export const PageDashboard: FC = () => {
  const viewerDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { current: container } = viewerDivRef;
    if (!container) {
      return;
    }

    const viewer = new Viewer(container, {
      baseLayer: ImageryLayer.fromProviderAsync(
        // 对于 CESIUM_BASE_URL 下的静态资源，推荐用 buildModuleUrl 获取
        TileMapServiceImageryProvider.fromUrl(
          buildModuleUrl('Assets/Textures/NaturalEarthII')
          // {
          //   fileExtension: 'jpg',
          // }
        ),
        {}
      ),
    });

    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <React.Fragment>
      <div ref={viewerDivRef} className="w-screen h-screen"></div>
    </React.Fragment>
  );
};

export default PageDashboard;
