import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Edit from './Edit';
import List from './List';

const PageChild: React.FC = () => {
  return (
    <Routes>
      <Route path="list" element={<List />} />
      <Route path="edit/:childId" element={<Edit />} />
      <Route path="*" element={<Navigate to="list" />} />
    </Routes>
  );
};

export default PageChild;
