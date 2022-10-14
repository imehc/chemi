import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '~/components';
import { useMockData } from '~/providers';

export const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { fatherId, sonId } = useParams<{ sonId: string; fatherId: string }>();

  const { mock2 } = useMockData();
  console.log(mock2, 'childstore...');
  return (
    <div>
      <Button
        theme="primary"
        onClick={() => navigate(`/father/${fatherId}/son`)}
      >
        返回
      </Button>
      PageChildEdit...{sonId}
    </div>
  );
};
export default Edit;
