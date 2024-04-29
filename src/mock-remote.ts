import { setItem, getItem, removeItem } from 'localforage';
import { IState } from './store';

export type IRemoteInfo = {
  scene: IState['sceneConfig'];
  models: IState['modelConfigs'];
};

const defaultKey = 'three-info';

/**
 * 模拟远程传递场景及模型的相关信息
 * @param info 场景及模型的相关信息
 * @returns 是否执行成功
 */
const addInfoToRemote = async (info: IRemoteInfo) => {
  try {
    // await removeInfoFromRemote()
    await setItem(defaultKey, JSON.stringify(info));
    return true;
  } catch (error) {
    console.error(error)
    return false;
  }
};

/**
 * 获取场景及模型的相关信息
 * @returns 场景及模型的相关信息
 */
const getInfoFromRemote = async () => {
  try {
    await sleep(500);
    const payload = await getItem<string>(defaultKey);
    if (payload !== null) {
      return JSON.parse(payload) as IRemoteInfo;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const removeInfoFromRemote = async () => {
  try {
    await removeItem(defaultKey);
    return true;
  } catch (error) {
    return false;
  }
};

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export { addInfoToRemote, getInfoFromRemote, removeInfoFromRemote };
