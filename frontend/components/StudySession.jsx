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

  if (studyList.length === 0) return <div>Đang tải...</div>;
  const currentWord = studyList[currentIndex];

  return (
    <div style={{ border: '2px solid #000', padding: '20px', textAlign: 'center' }}>
      {/* 1. Chọn chế độ */}
      <div style={{ marginBottom: '20px', background: '#ddd', padding: '10px' }}>
        Chế độ: 
        <button onClick={() => setMode('flashcard')} disabled={mode==='flashcard'}>Flashcard</button>
        <button onClick={() => setMode('input')} disabled={mode==='input'}>Điền từ</button>
      </div>

      <p>Nghĩa: <strong>{currentWord.translation}</strong></p>

      {/* 2. Nội dung theo chế độ */}
      {mode === 'flashcard' ? (
        <div>
          {isRevealed ? (
            <h1 style={{ color: 'blue' }}>{currentWord.original}</h1>
          ) : (
            <button onClick={() => setIsRevealed(true)}>Xem đáp án</button>
          )}
        </div>
      ) : (
        <div>
          <input 
            value={userInput} 
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Gõ từ..."
            onKeyPress={(e) => e.key === 'Enter' && (userInput.toLowerCase().trim() === currentWord.original.toLowerCase() ? setIsRevealed(true) : alert("Sai!"))}
          />
          {isRevealed && <h1 style={{ color: 'green' }}>Đúng: {currentWord.original}</h1>}
        </div>
      )}

      {/* 3. Đánh giá SRS (Chỉ hiện khi đã lộ đáp án) */}
      {isRevealed && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button 
            onClick={() => handleReview('again')} 
            style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '10px' }}
          >
            Again (1m)
          </button>
          
          <button 
            onClick={() => handleReview('hard')} 
            style={{ backgroundColor: '#ffa64d', color: 'white', padding: '10px' }}
          >
            Hard (2d)
          </button>
          
          <button 
            onClick={() => handleReview('medium')} 
            style={{ backgroundColor: '#4db8ff', color: 'white', padding: '10px' }}
          >
            Medium (4d)
          </button>
          
          <button 
            onClick={() => handleReview('easy')} 
            style={{ backgroundColor: '#47d147', color: 'white', padding: '10px' }}
          >
            Easy (7d)
          </button>
        </div>
      )}
    </div>
  );
};

export default StudySession;