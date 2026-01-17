import { useNavigate } from 'react-router-dom';
import StudySession from '../components/StudySession';

const StudyPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <StudySession onFinished={() => navigate('/')} />
    </div>
  );
};

export default StudyPage;
