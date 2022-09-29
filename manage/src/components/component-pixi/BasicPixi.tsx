import { Application, Loader, Sprite } from 'pixi.js';
import { useEffect, useRef } from 'react';

// https://www.pixijselementals.com/#enough-talk-have-at-you
// https://github.com/goldfire/howler.js#quick-start

const PixiBasic: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const setup = () => {
      const cat = new Sprite(loader.resources['cat'].texture);
      cat.position.set(20, 100);
      app.stage.addChild(cat);

      document.querySelector('.scaleCat')?.addEventListener('click', () => {
        const num = cat.scale.x + 0.1;
        cat.scale.set(num, num);
      });

      document.querySelector('.addWidth')?.addEventListener('click', () => {
        cat.width += 10;
      });

      document.querySelector('.addX')?.addEventListener('click', () => {
        cat.x += 10;
      });

      document.querySelector('.addRotation')?.addEventListener('click', () => {
        cat.rotation += 0.1;
      });

      document
        .querySelector('.changeAnchor')
        ?.addEventListener('click', (e) => {
          cat.anchor.set(0.5, 0.5);
        });

      cat.interactive = true;
      cat.addListener('pointerdown', (e) => {
        cat.alpha = cat.alpha === 0.5 ? 1 : 0.5;
      });
    };

    const app = new Application({
      width: 300,
      height: 300,
      backgroundColor: 0x00aeec,
    });
    ref.current.appendChild(app.view);

    const loader = new Loader();
    // 加载精灵
    loader
      .add(
        'cat',
        'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c5c58b2e55c4796aa3a67f602e3d284~tplv-k3u1fbpfcp-watermark.png'
      )
      .load(setup);
  }, []);

  return (
    <div>
      <div ref={ref} className="w-full h-full" />
      <div className="main">
        <button className="scaleCat">放大</button>
        <button className="addWidth">宽度 +10</button>
        <button className="addX">向右 +10</button>
        <button className="addRotation">旋转</button>
        <button className="changeAnchor">改变锚点为中心</button>
      </div>
      <p>点击猫咪改变透明度</p>
    </div>
  );
};

export default PixiBasic;
