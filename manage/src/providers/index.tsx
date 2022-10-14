import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import create, { type StoreApi } from 'zustand';
import createContext from 'zustand/context';
import { Mock1, Mock2, mockFatherData1 } from '~/mock';

const { Provider, useStore } = createContext<StoreApi<CreateStoreProps>>();

export interface CreateStoreProps {
  mock1s: Mock1[] | undefined;
  mock1: Mock1 | undefined;
  mock2: Mock2 | undefined;
  setMock1: (m: Mock1) => void;
  setMock2: (m: Mock2) => void;
}

const MockProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(['select-father-data'], async () => {
    const res = await mockFatherData1();
    return res;
  });
  const { fatherId } = useParams<{ fatherId: string }>();

  if (isLoading || !data) {
    return <div>loading...</div>;
  }

  const createStore = () =>
    create<CreateStoreProps>((set) => ({
      mock1s: data,
      mock1: data.find((d) => d.fid === Number(fatherId)) ?? data[0],
      mock2: undefined,
      setMock1: (mock1) => set(() => ({ mock1 })),
      setMock2: (mock2) => set(() => ({ mock2 })),
    }));

  return <Provider createStore={createStore}>{children}</Provider>;
};

export { MockProvider, useStore as useMockData };
