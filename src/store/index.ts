import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { PerspectiveCameraProps } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

// TODO: 由于保存到本地需要转换成number[]

const paths = ['porsche_gt3_rs', 'bmw_m4_f82', 'ferrari'].map((item) => ({
  path: {
    url: `/models/car/${item}.glb`,
    type: 'remote',
    picture: `/models/car/imgs/${item}.jpeg`,
  },
})) satisfies IConfig[];

export interface IPath {
  type: 'remote' | 'local';
  url: string;
  picture?: string;
}

/** 位置 缩放 旋转或四元数 父对象 */
export type IInfo = {
  position: number[];
  scale: number[];
  quaternion: number[];
  rotation: Array<number | string | undefined>;
  /** 父对象 */
  parentId?: number;
  // TODO: 模型材质，额外携带信息
  // materialState?: {
  // color:
  // opacity
  // };
  // otherState?: {
  // name: string;
  // };
};

export interface IConfig {
  path: IPath;
  uuid?: string;
  info?: IInfo;
}

interface ISceneConfig {
  /** 相机位置 相机近远裁剪平面 相机视角  */
  camera?: Pick<PerspectiveCameraProps, 'near' | 'far' | 'fov'> & {
    position: number[];
  };
  /** 控制器目标 控制器的缩放/距离 */
  controls?: Pick<OrbitControlsImpl['object'], 'zoom'> & { target: number[] };
  scene?: {
    /** @default park */
    preset?: PresetsType;
  };
}

export interface IState {
  /** 默认的可用模型 */
  defaultModelPaths: IConfig[];
  /** 场景信息 */
  sceneConfig?: ISceneConfig;
  /** 加载到场景的路径信息 */
  modelPaths: IConfig[];
  /** 场景中的模型配置 */
  modelConfigs: Required<IConfig>[];
  /** 当前选择的模型 */
  currentModelConfig?: Required<IConfig>;
}

interface IAction {
  /** 设置场景信息 */
  setSceneConfig(conf: ISceneConfig): void;
  /** 添加一个模型路径信息 */
  appendModelPath(path: IConfig): void;
  /** 设置模型路径信息 */
  setModelPaths(paths: IConfig[]): void;
  /** 添加一个模型配置 */
  appendModelConfig(config: Required<IConfig>): void;
  /** 更新一个模型配置 */
  updateCurrentModelConfig(config: Required<IConfig>): void;
  /** 清空场景所有模型 */
  clearModelConfigs(): void;
  /** 设置一个模型为当前选择模型 */
  setCurrentModel(uuid?: string): void;
}

export const useConfigStore = create(
  devtools(
    subscribeWithSelector<IState & IAction>((set, get) => ({
      sceneConfig: { scene: { preset: 'park' } },
      defaultModelPaths: paths,
      modelPaths: [],
      modelConfigs: [],
      setSceneConfig: (config) => set({ sceneConfig: config }),
      appendModelPath: (path) =>
        set({ modelPaths: [...get().modelPaths, path] }),
      setModelPaths: (paths) => set({ modelPaths: paths }),
      appendModelConfig: (config) =>
        set({
          modelConfigs: [...get().modelConfigs, config],
          currentModelConfig: config,
        }),
      updateCurrentModelConfig: (config) =>
        set({
          modelConfigs: get().modelConfigs.map((conf) =>
            conf.uuid === config?.uuid ? config : conf
          ),
          currentModelConfig: config,
        }),
      clearModelConfigs: () =>
        set({
          modelPaths: [],
          modelConfigs: [],
          currentModelConfig: undefined,
        }),
      setCurrentModel: (uuid) =>
        set({
          currentModelConfig: uuid
            ? get().modelConfigs.find((conf) => conf.uuid === uuid)
            : undefined,
        }),
    }))
  )
);
