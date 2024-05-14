import './App.css';
import Signup from './pages/AuthenticaionPages/Signup';
import Home from './pages/Home';
import Login from './pages/AuthenticaionPages/Login';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import AddService from './pages/Admin/AddService';
import SingleService from "./pages/UserPages/SingleService";
import AllServices from './pages/Admin/AllServices';
import ProvideAService from './pages/ServiceProviderPages/ProvideAService';
import UserOrders from './pages/UserPages/UserOrders';
import ServiceProviderOrders from './pages/ServiceProviderPages/ServiceProviderOrders';
import AllServiceProviders from './pages/Admin/AllServiceProviders';
import SingleServiceProvider from './pages/ServiceProviderPages/SingleServiceProvider';
import Profile from './pages/Profile/Profile';
import UpdateProfile from './pages/Profile/UpdateProfile';
import VerifyEmail from './pages/AuthenticaionPages/VerifyEmail';
import SingleOrder from './pages/UserPages/SingleOrder';
import RequireAuth from './middleware/RequireAuth';
import Error from './pages/Extra/Error';
import { jwtDecode } from 'jwt-decode';
import { setUserInfo } from './redux/reducers/authSlice';
import { useDispatch } from 'react-redux';
import Success from './pages/Extra/Success';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(setUserInfo(jwtDecode(token)));
  }
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route path='/' element={<Home />} />
            <Route element={<RequireAuth allowedRoles={['service_provider']} />}>
              <Route path='/service/provide-a-service' element={<ProvideAService />} />
              <Route path='/order/service-provider-orders' element={<ServiceProviderOrders />} />
              <Route path='/service/:id' element={<SingleService />} />
            </Route>

            <Route path='/service/add-service' element={<AddService />} />
            <Route path='/service' element={<AllServices />} />
            <Route path='/service-providers' element={<AllServiceProviders />} />
            <Route path='/service-providers/:id' element={<SingleServiceProvider />} />

            <Route path='/user-orders' element={<UserOrders />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/profile/updateprofile/:id' element={<UpdateProfile />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='/order/:id' element={<SingleOrder />} />
            <Route path='/order/success' element={<Success />} />
          </Route>
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
