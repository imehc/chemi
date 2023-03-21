import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { type StoreApi, createStore, useStore } from 'zustand';
import { Mock1, Mock2, mockFatherData1 } from '~/mock';
import { useProfileStore } from '~/store';

// const { Provider } = createContext<StoreApi<CreateStoreProps>>();
const MockProviderContext = createContext<StoreApi<CreateStoreProps>>(
  {} as any
);

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
  // 全局变量
  const { globalMock2 } = useProfileStore();
  const { data, isLoading } = useQuery(['select-father-data'], async () => {
    const res = await mockFatherData1();
    return res;
  });
  const { fatherId } = useParams<{ fatherId: string }>();

  if (isLoading || !data) {
    return <div>loading...</div>;
  }

  const createBearStore = () =>
    createStore<CreateStoreProps>((set) => ({
      mock1s: data,
      mock1: data.find((d) => d.fid === Number(fatherId)) ?? data[0],
      mock2: globalMock2, // 有优先使用全局变量
      setMock1: (mock1) => set(() => ({ mock1 })),
      setMock2: (mock2) => set(() => ({ mock2 })),
    }));

  return (
    <MockProviderContext.Provider value={createBearStore()}>
      {children}
    </MockProviderContext.Provider>
  );
};

const useMockData = () => {
  const store = useContext(MockProviderContext);
  const contextValue = useStore(store);
  return contextValue;
};

export { MockProvider, useMockData };
