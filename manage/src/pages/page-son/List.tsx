import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { mockChildData1 } from '~/mock';
import { useMockData } from '~/providers';
import { useProfileStore } from '~/store';

export const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { fatherId } = useParams<{ fatherId: string }>();
  const { data, isLoading } = useQuery(['select-son-data'], async () => {
    if (!fatherId) {
      return;
    }
    const res = await mockChildData1(Number(fatherId));
    return res;
  });

  const { setGlobalMock2 } = useProfileStore();

  if (isLoading || !data) {
    return <div>loading...</div>;
  }
  // console.log(data, 'sondata....');

  return (
    <React.Fragment>
      <button onClick={() => navigate(`/father`)}>
        返回
      </button>
      <div>{data.name}</div>
      {data.data?.map((d, i) => (
        <div
          key={i}
          onClick={() => {
            setGlobalMock2(data);
            navigate(`../${d.sid}/child`);
          }}
        >
          {d.address}
        </div>
      ))}
    </React.Fragment>
  );
};
export default Edit;
