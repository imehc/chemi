import React, { type FC } from 'react';
import { ThreeDemo01 } from '~/components';
import { useSpring, animated } from '@react-spring/web';

export const PageDashboard: FC = () => {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
    }),
    []
  );

  return (
    <React.Fragment>
      {/* <div
        className="animate-bounce-alt animate-duration-1s animate-count-infinite i-twemoji-frog"
        m="10"
        text="36px"
        display="inline-block"
      /> */}
      {/* <ThreeDemo01 /> */}
      <div>
        <animated.div style={props}>Hello World</animated.div>
      </div>
    </React.Fragment>
  );
};

export default PageDashboard;
