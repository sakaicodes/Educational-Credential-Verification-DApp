import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Issuance from './pages/Issuance';
import Verification from './pages/Verification';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error/Error404';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/verifierportal' element={<Verification />}/>
        <Route path='/issuerportal' element={<Issuance />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='*' element={<Error404 />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
