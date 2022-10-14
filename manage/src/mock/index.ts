export interface Mock1 {
  fid: number;
  name: string;
}

const mock1: Mock1[] = [
  {
    fid: 1,
    name: "张三",
  },
  {
    fid: 2,
    name: "李四",
  },
  {
    fid: 3,
    name: "王五",
  },
  {
    fid: 4,
    name: "赵六",
  }
]

export interface Mock2 {
  fid: number;
  name: string;
  sid: number;
  data?: {
    sid: number;
    age: number;
    address: string
  }[]
}

const mock2: Mock2[] = [
  {
    fid: 1,
    name: "张三的儿子",
    sid: 111,
    data: [
      {
        sid: 1111,
        age: 31,
        address: "张三的孙子在北京"
      },
      {
        sid: 1112,
        age: 32,
        address: "张三的孙子在上海"
      }
    ]
  },
  {
    fid: 2,
    name: "李四的儿子",
    sid: 222
  },
  {
    fid: 3,
    name: "王五的儿子",
    sid: 333,
    data: [
      {
        sid: 3333,
        age: 41,
        address: "王五的孙子在深圳"
      },
      {
        sid: 3334,
        age: 43,
        address: "王五的孙子在长沙"
      },
      {
        sid: 3335,
        age: 42,
        address: "王五的孙子在上海"
      }
    ]
  },
  {
    fid: 4,
    name: "赵六的儿子",
    sid: 444
  }
]

const mockFatherData1 = () => {
  return new Promise<Mock1[]>((resove) => {
    return setTimeout(() => {
      return resove(mock1);
    }, 200);
  })
}

const mockChildData1 = (fid: Mock1['fid']) => {
  console.log(fid)
  return new Promise<Mock2>((resove, reject) => {
    return setTimeout(() => {
      const newData = mock2.find((m => m.fid === fid))
      if (newData) {
        return resove(newData);
      }
      reject("没有找到")
    }, 200);
  })
}

export { mockFatherData1, mockChildData1 }