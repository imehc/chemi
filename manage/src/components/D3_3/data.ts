type Data = {
  value: number;
  time: Date;
}
export type MockData = {
  key: "x" | "y" | "z"
} & Data

const random = (length: number) => {
  return [...new Array(length)].map((_, i) => {
    return {
      time: new Date(`2022-11-28 0${i}:00:00`),
      value: Number((Math.random() * 500 + 1).toFixed(0))
    }
  })
}

const addKey = (data: Data[], key: Pick<MockData, 'key'>['key']): MockData[] => {
  return data.map((d) => ({
    ...d,
    key
  }))
}

const x = addKey(random(24), 'x')
const y = addKey(random(24), 'y')
const z = addKey(random(24), 'z')

const d = { x, y, z }

const data = [...d.x, ...d.y, ...d.z]
// const data = [...d.x,]
// const data = [{ x }, { y }, { z }]

export default data


const legendData = [
  {
    name: "分类一",
    color: "#f5a209",
  },
  {
    name: "分类二",
    color: "#f54d33",
  },
  {
    name: "分类三",
    color: "#26fd00",
  }
]

export {
  legendData
}