import React from 'react';
import { DarkDemo, LanguageDemo } from '~/components';

export const PageDashboard: React.FC = () => {
  return (
    <React.Fragment>
      <LanguageDemo />
      <DarkDemo />
    </React.Fragment>
  );
};
export default PageDashboard;
