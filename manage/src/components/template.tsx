import { useEffect, useState } from 'react';

export const BaseTemplate = () => {
  const [container, setContainer] = useState<HTMLDivElement | null>();

  useEffect(() => {
    if (!container) {
      return;
    }
    
    // TODO:
  }, []);

  return <div ref={setContainer}></div>;
};
