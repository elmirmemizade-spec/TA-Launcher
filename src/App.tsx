import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import DownloadsPage from './pages/DownloadsPage';
import DashboardPage from './pages/DashboardPage';
import AIChat from './components/ai-chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      {/* AI Chat - Global component */}
      <AIChat />
    </BrowserRouter>
  );
}

export default App;