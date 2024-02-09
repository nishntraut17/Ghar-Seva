import './App.css';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import AddService from './pages/AddService';
import SingleService from "./pages/SingleService";
import AllServices from './pages/AllServices';
import BecomeServiceProvider from './pages/BecomeServiceProvider';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/service/addservice' element={<AddService />} />
            <Route path='/services' element={<AllServices />} />
            <Route path='/service/:id' element={<SingleService />} />
            <Route path='/service-provider' element={<BecomeServiceProvider />} />
          </Route>
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
