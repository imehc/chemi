import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MockProvider } from '~/providers';
import PageChild from '../page-child';
import Edit from './Edit';
import List from './List';

const PageSon: React.FC = () => {
  return (
    <Routes>
      <Route path="list" element={<List />} />
      <Route path="edit/:sonId" element={<Edit />} />
      <Route path=":sonId/child/*" element={<PageChild />} />
      <Route path="*" element={<Navigate to="list" />} />
    </Routes>
  );
};

export default PageSon;
