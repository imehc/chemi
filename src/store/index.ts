import { Euler, Vector3 } from 'three';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const paths = ['porsche_gt3_rs', 'bmw_m4_f82', 'ferrari'].map((item) => ({
  url: `/models/car/${item}.glb`,
  type: 'remote',
  picture: `/models/car/imgs/${item}.jpeg`,
})) satisfies (IPath & { picture: string })[];

export interface IPath {
  type: 'remote' | 'local';
  url: string;
}

export interface IInfo {
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
}

interface IConfig {
  uuid: string;
  path: IPath;
  info: IInfo;
}

interface ISceneConfig {
  camera: IInfo;
}

export interface IState {
  /** 默认的可用模型 */
  defaultModelPaths: (IPath & { picture: string })[];
  /** 场景信息 */
  sceneConfig?: ISceneConfig;
  /** 加载到场景的路径信息 */
  modelPaths: (IPath & { info?: IInfo })[];
  /** 场景中的模型配置 */
  modelConfigs: IConfig[];
  /** 当前选择的模型 */
  currentModelConfig?: IConfig;
}

interface IAction {
  /** 设置场景信息 */
  setSceneConfig(conf: ISceneConfig): void;
  /** 添加一个模型路径信息 */
  appendModelPath(path: IPath): void;
  /** 添加一个模型配置 */
  appendModelConfig(config: IConfig): void;
  /** 更新一个模型配置 */
  updateCurrentModelConfig(config: IConfig): void;
  /** 清空场景所有模型 */
  clearModelConfigs(): void;
  /** 设置一个模型为当前选择模型 */
  setCurrentModel(uuid?: string): void;
}

export const useConfigStore = create<IState & IAction>()(
  devtools((set, get) => ({
    defaultModelPaths: paths,
    modelPaths: [],
    modelConfigs: [],
    setSceneConfig: (config) => set({ sceneConfig: config }),
    appendModelPath: (path) => set({ modelPaths: [...get().modelPaths, path] }),
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
      set({ modelPaths: [], modelConfigs: [], currentModelConfig: undefined }),
    setCurrentModel: (uuid) =>
      set({
        currentModelConfig: uuid
          ? get().modelConfigs.find((conf) => conf.uuid === uuid)
          : undefined,
      }),
  }))
);
