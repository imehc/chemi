const demo01 = [
  { name: "基本场景" },
  { name: "鼠标事件" },
  { name: "场景状态" },
  { name: "使用useMemo进行优化" },
  { name: "共享对象" },
  { name: "统计面板" },
  { name: "性能统计面板" },
  { name: "轨道控制" },
  { name: "第一人称轨道控制" },
  { name: "助手" },
  { name: "GUI组件" },
  { name: "材质" },
  { name: "灯光" },
  { name: "阴影" },
  { name: "使用图片纹理" },
  { name: "加载模型" },
  { name: "环境" },
  { name: "GLTF场景" },
  { name: "useGLTF" },
  { name: "添加注释" },
  { name: "GLTFJSX" },
  { name: "使用插值(Lerp)" },
  { name: "自动移Hook" },
];

const demo02 = [
  { name: "房子" },
  { name: "修改几何属性" },
  { name: "嵌套组件" },
  { name: "事件传播" },
  { name: "更改相机位置及其面向位置" },
  { name: "层次结构" },
  { name: "FPS 八叉树" },
  { name: "无限滚动" },
  { name: "鼠标滑动" },
  { name: "平滑过渡" },
  { name: "Squircle" },
  { name: "物料拾取" },
  { name: "神经网络" },
  { name: "地球 Map" },
  { name: "摄影测量" },
];
// custom
const demo03 = [
  { name: "加载本地模型", folder: 'components/component-preview-model' },
  // { name: "多视图编辑器", folder: 'components/component-multiple-view' },
  { name: "D3Map", folder: 'components/component-three-map' },
  { name: "Theatre 编辑器", folder: 'components/component-theatre' },
  { name: "场景背景切换", folder: 'components/component-three-dimensional' },
];

// juejin
const demo04 = [{ name: "汽车换肤" }, { name: "3D卡片" }];

const menus = [
  {
    category: "基础教程",
    items: demo01.map((item, idx) => ({
      ...item,
      href: `${100 + idx + 1}`,
      folder: `demo/${(idx + 1).toString().padStart(2, "0")}`,
    })),
  },
  {
    category: "进阶示例",
    items: demo02.map((item, idx) => ({
      ...item,
      href: `${200 + idx + 1}`,
      folder: `demo2/${(idx + 1).toString().padStart(2, '0')}`,
    })),
  },
  {
    category: "自定义组件",
    items: demo03.map((item, idx) => ({
      ...item,
      href: `${300 + idx + 1}`,
    })),
  },
  {
    category: "实战案例",
    items: demo04.map((item, idx) => ({
      ...item,
      href: `${400 + idx + 1}`,
      folder: `demo3/${(idx + 1).toString().padStart(2, '0')}`,
    })),
  },
];

export default menus;
