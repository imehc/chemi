import { useNavigate, useParams } from 'react-router-dom';
import { useMockData } from '~/providers';
import { useProfileStore } from '~/store';

export const List: React.FC = () => {
  const navigate = useNavigate();
  const { fatherId, sonId } = useParams<{ sonId: string; fatherId: string }>();

  const { mock2 } = useMockData();
  console.log(mock2, 'childstore...');

  const { name, year, globalMock2, setName, setYear } = useProfileStore();
  console.log(globalMock2, 'globalMock2...');
  return (
    <div>
      <h3 className="text-[#00ff4c] text-xl">profile_name：{name}</h3>
      <div className="text-[#00ff4c]">profile_year：{year}</div>
      <button
        className="px-[5px] border-[1px] rounded-[5px] border-solid border-gray-300 text-[#202324]"
        type="button"
        onClick={() => {
          setName('New-Child-imche');
          setYear(10222);
        }}
      >
        更新
      </button>
      <button
        className="px-[5px] border-[1px] rounded-[5px] border-solid border-gray-300 text-[#202324] ml-3 my-3"
        type="button"
        onClick={() => {
          setName('imche');
          setYear(2022);
        }}
      >
        重置
      </button>
      <hr />
      <button onClick={() => navigate(`/father/${fatherId}/son`)}>返回</button>
      PageChildList...{sonId}
    </div>
  );
};
export default List;
