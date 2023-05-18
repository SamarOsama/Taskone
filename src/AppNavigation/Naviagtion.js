import React from 'react'
import Paths from './Routes'
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import Customer from '../pages/Customer';
import CustomerTableComponent from '../components/CustomerTableComponent';




export default function Navigation() {
    return (
        
            <Routes>
               
                
                <Route path={'/'} element={<Customer  />} />

                 <Route path={Paths.Home} element={<Customer />} />
                 
                 <Route path={Paths.CustomerTablePage} element={<CustomerTableComponent />} />
            </Routes>
  
    )
}
