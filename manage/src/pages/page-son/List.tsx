import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '~/components';
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

  const { mock1, mock2, setMock2 } = useMockData();
  console.log(mock1, 'sonstorewithmock1...');
  console.log(mock2, 'sonstorewithmock2...');

  const { setGlobalMock2 } = useProfileStore();

  if (isLoading || !data) {
    return <div>loading...</div>;
  }
  // console.log(data, 'sondata....');

  return (
    <React.Fragment>
      <Button theme="primary" onClick={() => navigate(`/father`)}>
        返回
      </Button>
      <div>{data.name}</div>
      {data.data?.map((d, i) => (
        <div
          key={i}
          onClick={() => {
            setMock2(data);
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
