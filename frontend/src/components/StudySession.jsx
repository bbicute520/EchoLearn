import { useState, useEffect } from 'react';
import axios from 'axios';

const StudySession = ({ onFinished }) => {
  const [studyList, setStudyList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState('flashcard'); // 'flashcard' hoặc 'input'
  const [isRevealed, setIsRevealed] = useState(false); // Cho flashcard
  const [userInput, setUserInput] = useState(''); // Cho input

  useEffect(() => {
    axios.get('http://localhost:5000/api/words/study').then(res => setStudyList(res.data));
  }, []);

  const handleReview = async (quality) => {
    const word = studyList[currentIndex];
    await axios.post(`http://localhost:5000/api/words/review/${word._id}`, { quality });
    
    if (currentIndex < studyList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsRevealed(false);
      setUserInput('');
    } else {
      onFinished();
    }
  };

  if (studyList.length === 0) return <div className="text-gray-500">Đang tải...</div>;
  const currentWord = studyList[currentIndex];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
      {/* 1. Chọn chế độ */}
      <div className="mb-6 bg-gray-100 p-2 rounded-lg inline-flex gap-2">
        <span className="self-center px-2 text-sm text-gray-500">Chế độ:</span>
        <button 
          onClick={() => setMode('flashcard')} 
          disabled={mode==='flashcard'}
          className={`px-3 py-1 rounded-md text-sm transition ${mode === 'flashcard' ? 'bg-white shadow text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Flashcard
        </button>
        <button 
          onClick={() => setMode('input')} 
          disabled={mode==='input'}
          className={`px-3 py-1 rounded-md text-sm transition ${mode === 'input' ? 'bg-white shadow text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Điền từ
        </button>
      </div>

      <p className="text-lg text-gray-600 mb-4">Nghĩa: <strong className="text-gray-900">{currentWord.translation}</strong></p>

      {/* 2. Nội dung theo chế độ */}
      {mode === 'flashcard' ? (
        <div className="h-32 flex items-center justify-center">
          {isRevealed ? (
            <h1 className="text-4xl font-bold text-blue-600 animate-fade-in">{currentWord.original}</h1>
          ) : (
            <button 
              onClick={() => setIsRevealed(true)}
              className="bg-blue-100 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-200 transition font-medium"
            >
              Xem đáp án
            </button>
          )}
        </div>
      ) : (
        <div className="h-32 flex flex-col items-center justify-center gap-3">
          <input 
            value={userInput} 
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Gõ từ..."
            className="border-2 border-gray-300 p-3 rounded-lg w-full max-w-xs focus:border-blue-500 focus:outline-none text-center text-lg"
            onKeyPress={(e) => e.key === 'Enter' && (userInput.toLowerCase().trim() === currentWord.original.toLowerCase() ? setIsRevealed(true) : alert("Sai!"))}
          />
          {isRevealed && <h1 className="text-green-600 font-bold text-xl">Đúng: {currentWord.original}</h1>}
        </div>
      )}

      {/* 3. Đánh giá SRS (Chỉ hiện khi đã lộ đáp án) */}
      {isRevealed && (
        <div className="mt-8 grid grid-cols-4 gap-2">
          <button 
            onClick={() => handleReview('again')} 
            className="bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 font-medium text-sm"
          >
            Again (1m)
          </button>
          
          <button 
            onClick={() => handleReview('hard')} 
            className="bg-orange-100 text-orange-600 py-2 rounded-lg hover:bg-orange-200 font-medium text-sm"
          >
            Hard (2d)
          </button>
          
          <button 
            onClick={() => handleReview('medium')} 
            className="bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 font-medium text-sm"
          >
            Medium (4d)
          </button>
          
          <button 
            onClick={() => handleReview('easy')} 
            className="bg-green-100 text-green-600 py-2 rounded-lg hover:bg-green-200 font-medium text-sm"
          >
            Easy (7d)
          </button>
        </div>
      )}
    </div>
  );
};

export default StudySession;