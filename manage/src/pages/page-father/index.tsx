import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MockProvider } from '~/providers';
import PageSon from '../page-son';
import Edit from './Edit';
import List from './List';

const PageFather: React.FC = () => {
  const location = useLocation();
  return (
    <MockProvider>
      <Routes>
        <Route path="list" element={<List />} />
        <Route path="edit/:fatherId" element={<Edit />} />
        <Route path=":fatherId/son/*" element={<PageSon />} />
        <Route path="*" element={<Navigate to="list" />} />
      </Routes>
    </MockProvider>
  );
};

export default PageFather;
