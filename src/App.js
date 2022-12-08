import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { firestore, auth } from "./firebase/firbaseConfig";
import LandingPage from './Components/LandingPage/LandingPage';
import ModelPage from "./Components/ModelsPage/ModelPage";
import VariantsPage from "./Components/VariantsPage/VariantsPage";
import AccessoriesPage from "./Components/AccessoriesPage/AccessoriesPage";
import QuotationPage from "./Components/QuotationPage/QuotationPage";
import Bank from './Components/Bank/Bank';
import EMICalculator from './Components/EMICalculator/EMICalculator';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Profile from './Components/Profile/Profile';
import CustomerModal from './Components/CustomerModal/CustomerModal';
import MenuBar from './Components/MenuBar/MenuBar';
import Customers from './Components/Customers/Customers';

function App() {

  function proceed() {
    document.querySelector(".menu-bar-container").style.display = "block";
  }

  const customer_modal_display = () => {
    document.querySelector(".modal-container").style.display = "flex";
  }

  return (
    <BrowserRouter>
      <div className="App">
        <div className='menu-bar' onClick={proceed}></div>
        <div className='customer-info' onClick={customer_modal_display}></div>
        <CustomerModal />
        <MenuBar />
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/customers' element={<Customers />}/>
          <Route path='/model' element={<ModelPage />}/>
          <Route path='/variants' element={<VariantsPage />}/>
          <Route path='/accessories' element={<AccessoriesPage />}/>
          <Route path='/quotation' element={<QuotationPage />}/>
          <Route path='/bank' element={<Bank />}/>
          <Route path='/emi' element={<EMICalculator />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
