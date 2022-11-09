export type Data = {
  value: number;
  time: Date;
}
export type ObjectData = {
  [key: string]: Data[];
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
const random2 = (length: number) => {
  return [...new Array(length)].map((_, i) => {
    return {
      time: new Date(`2022-11-28 0${i}:00:00`),
      value: null
    }
  })
}

const random3 = (length: number) => {
  return [...new Array(length)].map((_, i) => {
    return {
      time: new Date(`2022-11-28 0${i}:00:00`),
      value: Number((Math.random() * 100 + 1).toFixed(0))
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
const y = addKey(random3(24), 'y')
const z = addKey(random(24), 'z')

// const x = (random(24))
// const y = (random(24))
// const z = (random(24))

const d = { x, y, z }

const data2 = [...d.x, ...d.y]
// const data = [...d.x,]
// const data = [{ x }, { y }, { z }]

// const data = [x, y, z]
const data: ObjectData = { x, y, z }

export {
  data,
  data2
}



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