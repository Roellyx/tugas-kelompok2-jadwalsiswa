import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Siswa from './components/siswa';
import Kelas from './components/kelas';
function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar />
          <Routes>
            <Route path="/siswa"/>
            <Route path="/kelas"/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
