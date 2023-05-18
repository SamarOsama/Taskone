import logo from './logo.svg';
import './App.css';
import Customer from './pages/Customer';
import { CustomerContextProvider } from './context/CustomerContext';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './AppNavigation/Naviagtion';

function App() {
  return (
    <div className="App">
            <CustomerContextProvider>
            <BrowserRouter>
            <Navigation/>
            </BrowserRouter>
     </CustomerContextProvider>
     </div>
  );
}

export default App;
