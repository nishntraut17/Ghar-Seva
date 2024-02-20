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
import ProvideAService from './pages/ProvideAService';
import UserOrders from './pages/UserOrders';
import ServiceProviderOrders from './pages/ServiceProviderOrders';
import AllServiceProviders from './pages/AllServiceProviders';
import SingleServiceProvider from './pages/SingleServiceProvider';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/service/add-service' element={<AddService />} />
            <Route path='/service' element={<AllServices />} />
            <Route path='/service/:id' element={<SingleService />} />
            <Route path='/service/service-providers/:id' element={<SingleServiceProvider />} />
            <Route path='/service/provide-a-service' element={<ProvideAService />} />
            <Route path='/service/service-providers' element={<AllServiceProviders />} />
            <Route path='/order/service-provider-orders' element={<ServiceProviderOrders />} />
            <Route path='/order/user-orders' element={<UserOrders />} />
          </Route>
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
