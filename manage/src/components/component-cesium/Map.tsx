import React, {
  ElementRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Ion,
  Viewer,
  SceneMode,
  LabelStyle,
  VerticalOrigin,
  ScreenSpaceEventType,
  ImageryLayer,
  defined,
  SceneTransforms,
  UrlTemplateImageryProvider,
  BoundingSphere,
  Cartesian3,
  Cartographic,
  Math,
  ScreenSpaceEventHandler,
  Cartesian2,
  Color,
} from 'cesium';

import { pointInfo } from './mock';
import { getPointIcon } from './util';
import { Popup, PopupProps } from './Popup';
import styled from 'styled-components';

// 官方 https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions
// 中文 http://cesium.xin/cesium/cn/Documentation1.62/Viewer.html?classFilter=viewer
// demo https://sandcastle.cesium.com/?src=Cesium%20Inspector.html

type PopupDataProps = {
  /**
   * 唯一Id
   */
  layerId: string;
  lon: string;
  lat: string;
  /**
   * 弹框的Element
   */
  element: HTMLElement;
  /**
   * 中间立方体最大高度
   */
  boxHeightMax: number;
};

const CesiumMap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<ElementRef<typeof Popup>>(null);

  const [popData, setPopData] =
    useState<Pick<PopupProps, 'pointId' | 'title'>>();

  const key = useMemo<string>(
    () =>
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2N2UxM2U3Ny1jZjkwLTRkYmItYWUwYy01ZWZhMjZiNzRkMTMiLCJpZCI6MTA5NjIyLCJpYXQiOjE2NjQ0MzE4MzJ9.aaIJOI6kEJaHlbR6OnXYju7SyyFTYAz7pkm5QhaKPa0',
    []
  );
  const baseOptions = useMemo<Viewer.ConstructorOptions>(
    () => ({
      baseLayerPicker: false, // 如果设置为false，则不会创建BaseLayerPicker小部件，图层选择器
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
        url: 'appmaptile?style=6&x={x}&y={y}&z={z}',
        maximumLevel: 17,
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
    mapClickListener(viewer);
    // addEntityModel(viewer);
  }, []);
  // 初始化
  const init = useCallback((el: HTMLDivElement): Viewer => {
    const viewer = new Viewer(el, baseOptions);
    // 高德影像注记地图
    viewer.imageryLayers.addImageryProvider(
      new UrlTemplateImageryProvider({
        url: 'appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
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
    clearEntityLayers(viewer);
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
        // billboard: {
        //   image: point,
        //   width: 24,
        //   height: 24,
        // },
        billboard: getPointIcon(pointObj.pointTypeId),
      });
    });
  }, []);
  // 添加实体模型
  const addEntityModel = useCallback((viewer: Viewer) => {
    const blueBox = viewer.entities.add({
      name: 'Blue Box',
      position: Cartesian3.fromDegrees(106.31348, 29.71617, 100.0),
      box: {
        dimensions: new Cartesian3(40.0, 100.0, 150.0),
        material: Color.BLUE, // 材质颜色
        // material: Cesium.Color.RED.withAlpha(0.5), // 配置颜色透明度
        // fill: false, // 配置 是否填满
        // outline: true, // 配置 是否显示外边框线
        // outlineColor: Cesium.Color.YELLOW, // 配置 设置外边框线颜色
      },
    });
    // 定位到实体
    viewer.zoomTo(blueBox);
  }, []);
  // 清除上一次加载的点位
  const clearEntityLayers = useCallback((viewer: Viewer) => {
    viewer.entities.removeAll();
  }, []);
  // 监听地图点击事件
  const mapClickListener = useCallback((viewer: Viewer) => {
    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    // 点击事件
    handler.setInputAction((click: ScreenSpaceEventHandler.PositionedEvent) => {
      console.log('左键鼠标点击事件：', click);
      // 屏幕坐标转世界坐标
      const cartesian = viewer.camera.pickEllipsoid(
        click.position,
        viewer.scene.globe.ellipsoid
      );
      if (!cartesian) return;
      // 将笛卡尔坐标转为地理坐标;从笛卡尔位置创建一个新的制图实例。结果对象中的值将以弧度为单位。
      const cartographic = Cartographic.fromCartesian(cartesian);
      // 将弧度转为度的十进制表示 Converts radians to degrees.
      const lon = Math.toDegrees(cartographic.longitude).toFixed(5);
      const lat = Math.toDegrees(cartographic.latitude).toFixed(5);
      // console.log(lon, lat);

      // 获取地图上的点位实体（entity）坐标
      const pick = viewer.scene.pick(click.position);
      //如果pick不为undefined，无哦吗点到点位了
      if (pick && pick.id) {
        // 定位到地图中心
        localtionToCenten(viewer, Number(lon), Number(lat));
        console.log(pick.id);
        // 弹框
        const { current: layer } = layerRef;
        if (!layer) return;
        const data = {
          layerId: 'layer1',
          lon: lon,
          lat: lat,
          element: layer,
          boxHeightMax: 0,
        } as PopupDataProps;

        layer.style.zIndex = '9990';

        showDynamiclayer(
          viewer,
          data,
          // 回调函数，改变弹窗的内容
          () => {
            setPopData({
              title: pick.id.name,
              pointId: pick.id.id,
            });
          }
        );
        // 调用弹框的默认方法
        popupRef.current?.defaultSetting();
      } else {
        // 移除弹框
        const { current: layer } = layerRef;
        if (layer) {
          removeDynamicLayer(layer);
          layer.style.zIndex = '-1';
        }
      }
    }, ScreenSpaceEventType.LEFT_CLICK);
  }, []);
  // 动态实体弹窗
  const showDynamiclayer = useCallback(
    (viewer: Viewer, data: PopupDataProps, callback: VoidFunction) => {
      /* 弹窗的dom操作--默认必须*/
      data.element.style.opacity = '0'; // 使用hide()或者display是不行的 因为cesium是用pre定时重绘的div导致 left top display 会一直重绘
      const { current: line } = lineRef;
      const { current: main } = mainRef;
      if (!line || !main) return;
      line.style.width = '0';
      main.style.display = 'none';
      /* 弹窗的dom操作--针对性操作*/
      callback();
      // 添加div弹窗
      const lon = Number(data.lon) * 1;
      const lat = Number(data.lat) * 1;
      const divPosition = Cartesian3.fromDegrees(lon, lat, data.boxHeightMax);
      data.element.style.opacity = '1';
      line.style.width = '50px'; // 线的宽度
      line.style.transition = '.5s';
      main.style.display = 'block';
      // 当为true的时候，表示当element在地球背面会自动隐藏。默认为false，置为false，不会这样。但至少减轻判断计算压力
      creatHtmlElement(viewer, data.element, divPosition, [10, -0], true);
    },
    []
  );
  // 创建一个 htmlElement元素 并且，其在earth背后会自动隐藏
  const creatHtmlElement = useCallback(
    (
      viewer: Viewer,
      element: HTMLElement,
      position: Cartesian3,
      arr: [number, number],
      flag?: boolean
    ) => {
      const scratch = new Cartesian2(); // cesium二维笛卡尔 笛卡尔二维坐标系就是我们熟知的而二维坐标系；三维也如此
      const scene = viewer.scene;
      const camera = viewer.camera;
      scene.preRender.addEventListener(() => {
        const canvasPosition = scene.cartesianToCanvasCoordinates(
          position,
          scratch
        ); // cartesianToCanvasCoordinates 笛卡尔坐标（3维度）到画布坐标
        if (defined(canvasPosition)) {
          element.style.left = canvasPosition.x + arr[0] + 'px';
          element.style.top = canvasPosition.y + arr[1] + 'px';
          // const  px_position=SceneTransforms.wgs84ToDrawingBufferCoordinates(scene,cartesian)
          // 此处进行判断
          if (flag) {
            const e = position;
            const i = camera.position;
            let n = scene.globe.ellipsoid.cartesianToCartographic(i).height;
            if (
              !((n += 1 * scene.globe.ellipsoid.maximumRadius),
              Cartesian3.distance(i, e) > n)
            ) {
              element.style.display = 'block';
            } else {
              element.style.display = 'none';
            }
          }
        }
      });
    },
    []
  );
  // 移除动态弹窗，为了方便，这里的移除是真的移除，因此，到时是需要重新创建弹窗的dom
  const removeDynamicLayer = useCallback(
    (element: PopupDataProps['element']) => {
      element.style.opacity = '0';
    },
    []
  );
  // 点位定位到地图中心
  const localtionToCenten = useCallback(
    (viewer: Viewer, lon: number, lat: number) => {
      const pointLocation = new BoundingSphere(
        Cartesian3.fromDegrees(lon * 1, lat * 1, 100),
        15000
      );
      viewer.camera.flyToBoundingSphere(pointLocation);
    },
    []
  );

  return (
    <React.Fragment>
      <div ref={ref} className="w-screen h-screen m-0 p-0 overflow-hidden" />
      <DynamicLayer ref={layerRef}>
        <Line ref={lineRef}></Line>
        <Main ref={mainRef}>
          <Popup
            ref={popupRef}
            pointId={popData?.pointId}
            title={popData?.title}
          />
        </Main>
      </DynamicLayer>
    </React.Fragment>
  );
};

export default CesiumMap;

const DynamicLayer = styled.div`
  display: none;
  user-select: none;
  pointer-events: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 534px;
  // width: 100%; // 这里设置成100%，打算在组件内根据内容设置具体的宽度实践 发现无效
  z-index: 99990;
`;

const Line = styled.div`
  position: absolute;
  left: 0;
  width: 0;
  /* height: 100px; */
  bottom: 0;
  /* background: url(./img/line.png); */
`;

const Main = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 30px;
  right: 0;
  /* bottom: 100px; */
  transform: translateY(-100%);
  /* background: url(~/assets/point.png) no-repeat; */
  background-size: 100% 100%;
  color: white;
  padding: 20px 20px 20px 20px;
  font-size: 14px;
  user-select: text;
  pointer-events: auto;
  background-color: rgba(3, 22, 37, 0.85);
`;
