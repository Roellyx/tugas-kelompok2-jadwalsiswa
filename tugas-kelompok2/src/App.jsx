import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar />
          <Routes>
            <Route path="/siswa" />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
