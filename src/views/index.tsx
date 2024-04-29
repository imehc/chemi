import { useQuery } from '@tanstack/react-query';
import { Home } from './home';
import { getInfoFromRemote } from '~/mock-remote';
import { FC } from 'react';

const Dashboard: FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-info-from-remote'],
    queryFn: async () => await getInfoFromRemote(),
    gcTime: 0,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        oops!!!
      </div>
    );
  }
  console.log(data?.models)
  return <Home data={data as Omit<NonNullable<typeof data>, 'null'>} />;
};

export default Dashboard;
