/**
 * 懒加载
 * @param element 
 */
export const lazyLoaded = (element: Element): void => {
  // https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entrie) => {
      const container = entrie.target;
      const content = container.querySelector('template')?.content;
      if (content) {
        container.appendChild(content);
      }
      io.unobserve(container);
    })
  })
  // 开始观察
  io.observe(element);
  // 停止观察
  // io.unobserve(element);
  // 关闭观察器
  // io.disconnect();
}
