import React, { useContext, useEffect  } from "react";
import { useNavigate } from 'react-router-dom';
import {  Col, Container, Row  } from "react-bootstrap";

import CustomerContext from "../context/CustomerContext";
import CustomerTableComponent from "../components/CustomerTableComponent";

function Customer() {
  const { loading,
    getFetchUsers,
    getFetchTransaction,
    
    customerTransaction } = useContext(CustomerContext)
  
  useEffect(() => {
    getFetchUsers();
    getFetchTransaction();
  }, []);

 
  const navigate = useNavigate();
  
  const navigateToCustomerTable =()=>{
    customerTransaction()
    navigate('/customer')
  }

 

  return (
    <>
    <Container>
         {loading ? (
        <h1>loading..</h1>
      ) : (
        
        <>
        <Row>
          <Col md={6}>

          <button className="btn btn-danger" onClick={navigateToCustomerTable} >
        show
      </button>
         
          </Col>
        </Row>
       

        </>
      )}
    </Container>
     

   

    </>
  );
}

export default Customer;
