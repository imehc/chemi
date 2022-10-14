import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '~/providers';

export const List: React.FC = () => {
  const navigate = useNavigate();
  
  const { mock1s, mock1, mock2, setMock1 } = useMockData();
  console.log(mock1, 'fatherstorewithmock1...');
  console.log(mock2, 'fatherstorewithmock2...');
  // console.log(data, 'fatherdata....');
  return (
    <React.Fragment>
      {mock1s?.map((d, i) => (
        <div
          key={i}
          onClick={() => {
            setMock1(d);
            navigate(`../${d.fid}/son`);
          }}
        >
          {d.name}
        </div>
      ))}
    </React.Fragment>
  );
};
export default List;
