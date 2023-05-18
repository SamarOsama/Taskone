import React, { createContext, useState } from "react";

let CustomerContext = createContext();

export function CustomerContextProvider(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setloading] = useState(true);
  const [users, setusers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filterKeyword, setFilterKeyword] = useState("");


  const [allData, setAllData] = useState([
    {
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
    },
  ]);
  

  const getFetchUsers = async () => {
    await fetch("http://localhost:3000/customers")
      .then((res) => res.json())
      .then((v) => setusers(v))
      .catch(console.log);

    setloading(false);
  };
  const getFetchTransaction = async () => {
    await fetch("http://localhost:3000/transactions")
      .then((res) => res.json())
      .then((v) => setTransactions(v))
      .catch(console.log);
  };

  const customerTransaction = async () => {
    var hambozo = [];
    setAllData([]);
    users?.map((user, i) => {
      let userName = user.name;
      let userID = user.id;
      let totalAmount = 0;
      let transactionsData = [];
      transactions.map((trans, i) => {
        if (trans.customer_id === user.id) {
          totalAmount = totalAmount + trans.amount;
          transactionsData.push(trans);
        }
      });
      hambozo.push({
        userName: userName,
        totalAmount: totalAmount,
        userID: userID,
        transactionsData: transactionsData,
      });
    });
    setAllData(hambozo);
    console.log(hambozo);
    setloading(false);
    
  };


  return (
    <CustomerContext.Provider
      value={{
        loading,
        users,
        show,
        handleShow,
        handleClose,
        transactions,
        allData,
        getFetchUsers,
        getFetchTransaction,
        customerTransaction,
        filterKeyword,
        setFilterKeyword


      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
}

export default CustomerContext;
