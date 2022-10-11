import { useEffect } from "react"

export const useInfinite = (footElement: Element, callback: VoidFunction): void => {
  useEffect(() => {
    if (!footElement) return;
    const io = new IntersectionObserver((entried) => {
      // 如果不可见，就返回
      if (entried[0].intersectionRatio <= 0) return;
      callback()
    })
    io.observe(footElement)
  }, [footElement, callback])
}