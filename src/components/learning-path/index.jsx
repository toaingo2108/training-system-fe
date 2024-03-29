import { textAbstract } from '../../utils';
import { useNavigate } from 'react-router-dom';

const LearningPath = ({ learningPath }) => {
  const navigate = useNavigate();
  return (
    <div
      className='rounded-xl h-40 bg-gradient-to-r from-sky-300 to-indigo-300 p-4 flex flex-col justify-between cursor-pointer hover:to-sky-300 hover:from-indigo-300 transition-all'
      onClick={() => navigate(`/learning-path/detail/${learningPath.id}`)}
    >
      <div className='text-sm max-h-20 overflow-hidden'>
        {textAbstract(learningPath.description, 100)}
      </div>
      <div>
        <img
          className='w-6 h-6 object-cover rounded-full pointer-events-none mb-2'
          src={learningPath?.imgLink}
          alt=''
        />
        <div className='text-lg'>{textAbstract(learningPath.name, 26)}</div>
      </div>
    </div>
  );
};

export default LearningPath;
