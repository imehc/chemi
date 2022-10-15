import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Mock2 } from '~/mock';

// https://github.com/pmndrs/zustand

interface ProfileStore {
  name: string | undefined,
  year: number | undefined,
  setName: (s: string | undefined) => void
  setYear: (y: number | undefined) => void
  globalMock2: Mock2 | undefined;
  setGlobalMock2: (m: Mock2) => void;
}

const useProfileStore = create(
  persist<ProfileStore>(
    (set) => ({
      name: "imche",
      year: 2022,
      setName: (name) => set(() => ({ name })),
      setYear: (year) => set(() => ({ year })),
      globalMock2: undefined,
      setGlobalMock2: (globalMock2) => set(() => ({ globalMock2 }))
    }), {
    name: 'global-storage', // unique name
    getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
  }
  )
)

export { useProfileStore }