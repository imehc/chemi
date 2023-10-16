
interface EzvizApiConf {
  /** 授权过程获取的access_token */
  accessToken: string;
  /** 设备序列号,存在英文字母的设备序列号，字母需为大写 */
  deviceSerial: string;
  /** 通道号 */
  channelNo: number;
}

interface ResponseData {
  code: string
  msg: string
}

/** 操作命令 */
export enum Direction {
  /** 上 */
  _0,
  /** 下 */
  _1,
  /** 左 */
  _2,
  /** 右 */
  _3,
  /** 左上 */
  _4,
  /** 左下 */
  _5,
  /** 右上 */
  _6,
  /** 右下 */
  _7,
  /** 放大 */
  _8,
  /** 缩小 */
  _9,
  /** 近焦距 */
  _10,
  /** 远焦距 */
  _11,
  /** 自动控制 */
  _16,
}

/** 云台速度 海康设备参数不可为0 */
export enum Speed {
  /** 慢 */
  _0,
  /** 适中 */
  _1,
  /** 快 */
  _2,
}

/**
 * @link https://open.ys7.com/help/679
 */
export class EzvizApi {
  private readonly conf: EzvizApiConf;

  constructor(conf: EzvizApiConf) {
    this.conf = conf
  }

  /**
   * 停止云台控制
   */
  async stopPTZControl(params?: { direction: Direction }): Promise<ResponseData> {
    return new Promise<ResponseData>((resolve, reject) => {
      const _params = new URLSearchParams({ ...this.conf, ...params } as unknown as Record<string, string>).toString();
      fetch(`https://open.ys7.com/api/lapp/device/ptz/stop?${_params}`, { method: 'POST' })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  /**
   * 开始云台控制
   */
  async startPTZControl(params: { direction: Direction, speed: Speed }): Promise<ResponseData> {
    return new Promise<ResponseData>((resolve, reject) => {
      const _params = new URLSearchParams({ ...this.conf, ...params } as unknown as Record<string, string>).toString();
      fetch(`https://open.ys7.com/api/lapp/device/ptz/start?${_params}`, { method: 'POST' })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}