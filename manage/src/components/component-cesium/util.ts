import point1 from './assets/point1.png'
import point2 from './assets/point2.png'
import point3 from './assets/point3.png'

// 获取点位图标
const getPointIcon = (pointTypeId: string) => {
  const base = { width: 24, height: 24 }
  if (pointTypeId === "1") {
    return { ...base, image: point1 }
  }
  if (pointTypeId === "2") {
    return { ...base, image: point2 }
  }
  return { ...base, image: point3 };
}

export {
  getPointIcon
}