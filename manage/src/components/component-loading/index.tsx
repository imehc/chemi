import { Center, Loader } from '@mantine/core';

export const Loading = () => {
  return (
    <Center className="bg-[rgba(96,165,250,.1)] flex-col h-full items-center w-full">
      <Loader color="blue" />
      <p className="m-3">loading...</p>
    </Center>
  );
};
