import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Ion, Viewer, SceneMode, LabelStyle, VerticalOrigin } from 'cesium';
import UrlTemplateImageryProvider from 'cesium/Source/Scene/UrlTemplateImageryProvider';
import BoundingSphere from 'cesium/Source/Core/BoundingSphere';
import Cartesian3 from 'cesium/Source/Core/Cartesian3';
import Cartesian2 from 'cesium/Source/Core/Cartesian2';
import Color from 'cesium/Source/Core/Color';

import point from './assets/point.png';
import { pointInfo } from './mock';

// https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions
// http://cesium.xin/cesium/cn/Documentation1.62/Viewer.html?classFilter=viewer

const CesiumMap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const key = useMemo<string>(
    () =>
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2N2UxM2U3Ny1jZjkwLTRkYmItYWUwYy01ZWZhMjZiNzRkMTMiLCJpZCI6MTA5NjIyLCJpYXQiOjE2NjQ0MzE4MzJ9.aaIJOI6kEJaHlbR6OnXYju7SyyFTYAz7pkm5QhaKPa0',
    []
  );
  const baseOptions = useMemo<Viewer.ConstructorOptions>(
    () => ({
      baseLayerPicker: false, // 如果设置为false，则不会创建BaseLayerPicker小部件
      geocoder: false, // 如果设置为false，则不会创建Geocoder小部件
      navigationHelpButton: false, // 如果设置为false，将不会创建导航帮助按钮
      homeButton: false, // 如果设置为false，将不会创建HomeButton小部件
      sceneModePicker: false, // 如果设置为false，将不会创建SceneModePicker小部件
      animation: false, // 如果设置为false，则不会创建'动画'小部件
      timeline: false, // 如果设置为false，则不会创建时间轴窗口小部件
      fullscreenButton: false, // 如果设置为false，将不会创建FullscreenButton小部件
      scene3DOnly: false, // 如果 true，则每个几何体实例将仅以3D渲染以节省GPU内存
      shouldAnimate: false, // 默为 true ，否则为 false。此选项优先于设置 Viewer＃clockViewModel、
      // ps. Viewer＃clockViewModel 是用于控制当前时间的时钟视图模型。我们这里用不到时钟，就把shouldAnimate设为false
      infoBox: false, // 是否显示点击要素之后显示的信息
      sceneMode: SceneMode.SCENE3D, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式
      requestRenderMode: false, // 启用请求渲染模式，如果为true，则仅根据场景中的更改确定是否需要渲染帧
      fullscreenElement: document.body, // 按下全屏按钮时，元素或ID将进入全屏模式
      // 使用高德影像地形地图
      imageryProvider: new UrlTemplateImageryProvider({
        url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      }),
    }),
    []
  );

  useEffect(() => {
    const { current: container } = ref;
    if (!container) return;
    Ion.defaultAccessToken = key;
    const viewer = init(container);
    addMarker(viewer);
  }, []);
  // 初始化
  const init = useCallback((el: HTMLDivElement): Viewer => {
    const viewer = new Viewer(el, baseOptions);
    // 高德影像注记地图
    viewer.imageryLayers.addImageryProvider(
      new UrlTemplateImageryProvider({
        url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
      })
    );
    // 设置初始位置  Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result)
    const boundingSphere = new BoundingSphere(
      Cartesian3.fromDegrees(106.51348, 29.6261, 100),
      15000
    );
    // 定位到初始位置
    viewer.camera.flyToBoundingSphere(boundingSphere, {
      // 定位到初始位置的过渡时间，设置成0，就没有过渡，类似一个过场的动画时长
      duration: 0,
    });

    // 隐藏版权
    (viewer as any)._cesiumWidget._creditContainer.style.display = 'none';

    return viewer;
  }, []);
  // 加载点位
  const addMarker = useCallback((viewer: Viewer) => {
    // 清除上一次加载的点位
    viewer.entities.removeAll();
    // 循环加载点位
    pointInfo.forEach((pointObj) => {
      return viewer.entities.add({
        name: pointObj.psName,
        id: pointObj.id,
        position: Cartesian3.fromDegrees(
          pointObj.longitude * 1,
          pointObj.latitude * 1
        ),
        // 点
        // point: {
        //   pixelSize: 5,
        //   color: Color.RED,
        //   outlineColor: Color.WHITE,
        //   outlineWidth: 2,
        // },
        // 文字标签
        label: {
          // show: false,
          text: pointObj.psName,
          font: '12px monospace',
          style: LabelStyle.FILL_AND_OUTLINE,
          // fillColor: Color.LIME, // 预制颜色
          fillColor: Color.fromCssColorString('rgb(11, 255, 244)'), // 自定义颜色
          outlineWidth: 4,
          verticalOrigin: VerticalOrigin.BOTTOM, // 垂直方向以底部来计算标签的位置
          pixelOffset: new Cartesian2(0, -20), // 偏移量
        },
        // 图标
        billboard: {
          image: point,
          width: 24,
          height: 24,
        },
      });
    });
  }, []);

  return (
    <div ref={ref} className="w-screen h-screen m-0 p-0 overflow-hidden"></div>
  );
};

export default CesiumMap;
