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
    <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg">
      <h4 className="font-medium mb-3">Nhập nhanh (Định dạng: word:meaning)</h4>
      <textarea 
        rows="6" 
        className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="apple:quả táo&#10;banana:quả chuối"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button 
        onClick={handleBulkAdd}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Lưu danh sách
      </button>
    </div>
  );
};

export default BulkAdd; 