import { ComboboxItem } from '@mantine/core';
import { lazy } from 'react';

const DemoV101 = lazy(() => import('./01'));
const DemoV102 = lazy(() => import('./02'));
const DemoV103 = lazy(() => import('./03'));
const DemoV104 = lazy(() => import('./04'));
const DemoV105 = lazy(() => import('./05'));
const DemoV106 = lazy(() => import('./06'));
const DemoV107 = lazy(() => import('./07'));
const DemoV108 = lazy(() => import('./08'));
const DemoV109 = lazy(() => import('./09'));
const DemoV110 = lazy(() => import('./10'));
const DemoV111 = lazy(() => import('./11'));
const DemoV112 = lazy(() => import('./12'));
const DemoV113 = lazy(() => import('./13'));
const DemoV114 = lazy(() => import('./14'));
const DemoV115 = lazy(() => import('./15'));
const DemoV116 = lazy(() => import('./16'));
const DemoV117 = lazy(() => import('./17'));
const DemoV118 = lazy(() => import('./18'));
const DemoV119 = lazy(() => import('./19'));
const DemoV120 = lazy(() => import('./20'));
const DemoV121 = lazy(() => import('./21'));
const DemoV122 = lazy(() => import('./22'));
const DemoV123 = lazy(() => import('./23'));

const DemoV201 = lazy(() => import('../demo2/01'));
const DemoV202 = lazy(() => import('../demo2/02'));
const DemoV203 = lazy(() => import('../demo2/03'));
const DemoV204 = lazy(() => import('../demo2/04'));
const DemoV205 = lazy(() => import('../demo2/05'));
const DemoV206 = lazy(() => import('../demo2/06'));
const DemoV207 = lazy(() => import('../demo2/07'));

export default [
  {
    label: '基本场景',
    value: '101',
    component: <DemoV101 />,
  },
  {
    label: '鼠标事件',
    value: '102',
    component: <DemoV102 />,
  },
  {
    label: '场景状态',
    value: '103',
    component: <DemoV103 />,
  },
  {
    label: '使用useMemo进行优化',
    value: '104',
    component: <DemoV104 />,
  },
  {
    label: '共享对象',
    value: '105',
    component: <DemoV105 />,
  },
  {
    label: '统计面板',
    value: '106',
    component: <DemoV106 />,
  },
  {
    label: '性能统计面板',
    value: '107',
    component: <DemoV107 />,
  },
  {
    label: '轨道控制',
    value: '108',
    component: <DemoV108 />,
  },
  {
    label: '第一人称轨道控制',
    value: '109',
    component: <DemoV109 />,
  },
  {
    label: '助手',
    value: '110',
    component: <DemoV110 />,
  },
  {
    label: 'GUI组件',
    value: '111',
    component: <DemoV111 />,
  },
  {
    label: '材质',
    value: '112',
    component: <DemoV112 />,
  },
  {
    label: '灯光',
    value: '113',
    component: <DemoV113 />,
  },
  {
    label: '阴影',
    value: '114',
    component: <DemoV114 />,
  },
  {
    label: '使用图片纹理',
    value: '115',
    component: <DemoV115 />,
  },
  {
    label: '加载模型',
    value: '116',
    component: <DemoV116 />,
  },
  {
    label: '环境',
    value: '117',
    component: <DemoV117 />,
  },
  {
    label: 'GLTF场景',
    value: '118',
    component: <DemoV118 />,
  },
  {
    label: 'useGLTF',
    value: '119',
    component: <DemoV119 />,
  },
  {
    label: '添加注释',
    value: '120',
    component: <DemoV120 />,
  },
  {
    label: 'GLTFJSX',
    value: '121',
    component: <DemoV121 />,
  },
  {
    label: '使用插值(Lerp)',
    value: '122',
    component: <DemoV122 />,
  },
  {
    label: '自动移Hook',
    value: '123',
    component: <DemoV123 />,
  },
  // 2
  {
    label: '房子',
    value: '201',
    component: <DemoV201 />,
  },
  {
    label: '修改几何属性',
    value: '202',
    component: <DemoV202 />,
  },
  {
    label: '嵌套组件',
    value: '203',
    component: <DemoV203 />,
  },
  {
    label: '事件传播',
    value: '204',
    component: <DemoV204 />,
  },
  {
    label: '更改相机位置及其面向位置',
    value: '205',
    component: <DemoV205 />,
  },
  {
    label: '层次结构',
    value: '206',
    component: <DemoV206 />,
  },
  {
    label: 'FPS 八叉树',
    value: '207',
    component: <DemoV207 />,
  },
] satisfies (ComboboxItem & {
  component: JSX.Element;
})[];
