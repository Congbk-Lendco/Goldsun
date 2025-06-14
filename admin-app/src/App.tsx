import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Admin/>} />          {/* Trang chủ */}
       
      </Routes>
    </Router>
  );
}

export default App;
