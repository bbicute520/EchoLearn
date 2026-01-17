import { useNavigate } from 'react-router-dom';
import BulkAdd from '../components/BulkAdd';

const AddWordPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <BulkAdd onAdded={() => navigate('/')} />
    </div>
  );
};

export default AddWordPage;
