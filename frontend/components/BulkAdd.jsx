import { useState } from 'react';
import axios from 'axios';

const BulkAdd = ({ onAdded }) => {
  const [text, setText] = useState("");

  const handleBulkAdd = async () => {
    // Tách dòng và parse định dạng "word:meaning"
    const lines = text.split('\n');
    const words = lines.map(line => {
      const [original, translation] = line.split(':');
      if (original && translation) {
        return { original: original.trim(), translation: translation.trim() };
      }
      return null;
    }).filter(w => w !== null);

    if (words.length === 0) return alert("Sai định dạng! Hãy nhập word:meaning mỗi dòng.");

    try {
      await axios.post('http://localhost:5000/api/words/bulk', { words });
      alert("Đã thêm thành công!");
      setText("");
      onAdded();
    } catch (err) {
      alert("Lỗi khi gửi dữ liệu.");
    }
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #ccc', background: '#f4f4f4' }}>
      <h4>Nhập nhanh (Định dạng: word:meaning)</h4>
      <textarea 
        rows="6" 
        style={{ width: '100%', marginBottom: '10px' }}
        placeholder="apple:quả táo&#10;banana:quả chuối"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleBulkAdd}>Lưu danh sách</button>
    </div>
  );
};

export default BulkAdd; 