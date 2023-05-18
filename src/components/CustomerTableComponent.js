import React, { useContext, useState } from 'react'
import CustomerContext from '../context/CustomerContext';
import { Col, Container, Row, Table } from 'react-bootstrap';
import CustomerDetails from './popups/CustomerDetails';

function CustomerTableComponent() {
    const { 
        show,
        handleShow,
        handleClose,
        allData,
        filterKeyword,
        setFilterKeyword,

         } = useContext(CustomerContext)
        
   const [sortColumn, setSortColumn] = useState("");
   const [sortOrder, setSortOrder] = useState("");
   const [selectedUserData, setselectedUserData] = useState({
    userName: "",
    totalAmount: 0,
    userID: 0,
    transactionsData: [
      {
        id: 0,
        customer_id: 0,
        date: "",
        amount: 0,
      },
    ],
  });
  const onSearchForuser = (event) => {
    const searchWord = event.target.value;
    setFilterKeyword(searchWord);
  };  
  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortOrder("asc");
    }
  };

  const sortedData = allData.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortOrder === "desc") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    } else {
      return 0;
    }
  });
  
  return (

<>
<Container>
    <Row>
        <Col md={6}>
            
        <input
            placeholder="Filter"
            name="search"
            type="text"
            className="form-control form-input-dashboard my-4"
            onKeyUp={onSearchForuser}
          />
            <Table striped bordered hover>
    <thead>
      <tr>
        <th onClick={() => handleSort("id")}>ID <i class="fa-light fa-arrow-up-arrow-down"></i></th>
        <th onClick={() => handleSort("userName")}> Name</th>
        <th onClick={() => handleSort("totalAmount")}> Total Amount</th>

        <th> Details</th>
      </tr>
    </thead>
    <tbody>
    
  
      {Object.values(sortedData)
        .filter((v, i) => {
          if (filterKeyword === "") {
            return true;
          } else {
            return v?.userName?.toLowerCase().includes(filterKeyword);
          }
        })
        .map((v) => {
          return (
            <tr key={v.userID}>
              <td>{v.userID}</td>
              <td>{v.userName}</td>
              <td>{v.totalAmount}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => {
                    setselectedUserData({
                      userName: v.userName,
                      totalAmount: v.totalAmount,
                      userID: v.userID,
                      transactionsData: v.transactionsData,
                    });
                    handleShow();
                  }}
                >
                  View Details
                </button>
              </td>
            </tr>
          );
        })}
    </tbody>
 </Table>
        </Col>
    </Row>
     </Container>

        <CustomerDetails selectedUserData={selectedUserData} show={show}  onHide={handleClose}/>
     </>
    
      
  )
}

export default CustomerTableComponent