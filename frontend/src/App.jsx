import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AddWordPage from './pages/AddWordPage';
import StudyPage from './pages/StudyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="add" element={<AddWordPage />} />
          <Route path="study" element={<StudyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;