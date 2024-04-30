import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Issuance from './pages/Issuance';
import Verification from './pages/Verification';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error/Error404';
import Error403 from './pages/Error/Error403';

export const USER_TYPES = {
  ISSUER: 'Issuer',
  VERIFIER: 'Verifier',
  ADMIN: "Admin"
}

export const CURRENT_USER = USER_TYPES.ADMIN

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PublicElement><Home /></PublicElement>}/>
        <Route path='/home' element={<PublicElement><Home /></PublicElement>}/>
        <Route path='/verifierportal' element={<VerifierAdminElement><Verification /></VerifierAdminElement>}/>
        <Route path='/issuerportal' element={<IssuerAdminElement><Issuance /></IssuerAdminElement>}/>
        <Route path='/dashboard' element={<IssuerAdminElement><Dashboard /></IssuerAdminElement>}/>
        <Route path='*' element={<Error404 />}/>

      </Routes>
    </BrowserRouter>
  );

  function PublicElement({children}){
    return<>{children}</>;
  }

  function IssuerAdminElement({children}){
    if(CURRENT_USER === USER_TYPES.ISSUER || CURRENT_USER === USER_TYPES.ADMIN){
      return<>{children}</>;
    } else {
      return <Error403 />
    }
  }

  function VerifierAdminElement({children}){
    if(CURRENT_USER === USER_TYPES.VERIFIER || CURRENT_USER === USER_TYPES.ADMIN){
      return<>{children}</>;
    } else {
      return <Error403 />
    }
  }
}

export default App;
