import './App.css';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Routes>
          <Route path='/' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
