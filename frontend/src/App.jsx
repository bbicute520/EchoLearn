// frontend/src/App.jsx
import { useState } from 'react';
import BulkAdd from '../components/BulkAdd';
import StudySession from '../components/StudySession';

function App() {
  const [view, setView] = useState('menu');

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center', // Căn giữa ngang
      alignItems: 'center',     // Căn giữa dọc
      minHeight: '100vh',       // Chiều cao phủ hết màn hình
      backgroundColor: '#f0f2f5',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',      // Giới hạn độ rộng tối đa
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#1a73e8' }}>Language Learner 📖</h2>
        
        <nav style={{ marginBottom: '20px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
          <button onClick={() => setView('add')}>Thêm từ</button>
          <button onClick={() => setView('study')}>Học tập</button>
          <button onClick={() => setView('menu')}>Menu</button>
        </nav>

        <hr style={{ opacity: 0.2, margin: '20px 0' }} />

        {view === 'add' && <BulkAdd onAdded={() => setView('menu')} />}
        {view === 'study' && <StudySession onFinished={() => setView('menu')} />}
        {view === 'menu' && (
          <div>
            <h3>Chào mừng bạn quay lại!</h3>
            <p>Chọn một mục để bắt đầu.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;