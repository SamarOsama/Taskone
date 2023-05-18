import React, { useContext } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
  } from "chart.js";

function CustomerDetails(props) {
    console.log(props)
    ChartJS.register(
        ArcElement,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
       const labels = props.selectedUserData?.transactionsData.map((v, i) => v.date);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
     
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Amount per day",
        data: props.selectedUserData?.transactionsData.map((v, i) => v.amount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (

    <Modal show={props.show}
    onHide={props.handleClose}
    backdrop="static"
    keyboard={false} >
    <Modal.Header closeButton>
      <Modal.Title>
        Transaction Details for {props.selectedUserData.userName}
      </Modal.Title>
    </Modal.Header>

    

    <Modal.Body><Table striped bordered hover size="sm">
      <thead>
        {" "}
        <th>Date</th>
        <th>Amount</th>
      </thead>
      <tbody>
        {props.selectedUserData?.transactionsData.map((v, i) => (
          <>
            <tr>
              <td>{v.date}</td> <td>{v.amount}</td>
            </tr>{" "}
          </>
        ))}
      </tbody>
    </Table>
      <Bar options={options} data={data} />
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Close
      </Button>
      
    </Modal.Footer>
  </Modal>
  )
}

export default CustomerDetails