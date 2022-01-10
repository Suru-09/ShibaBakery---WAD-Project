import React from "react";
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import Finish from "./Finish";
import OrderDet from "./OrderDetails";
import Payment from "./Payment";
import GetUserAfterUsername from "../utils/GetUserAfterUsername";
import GetCookie from "../utils/GetCookie";
import { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const ProgressBar = () => {

  const [orderDetails, setOrderDetails] = useState([]);

  const orderDetailsCallback = (orderDet) => {
    setOrderDetails(orderDet);
  }

  const [product, setProduct] = useState([]);
  const [user, setUser] = useState('');

  const createArray = (product_list) => {
      var result = []
      for(let i = 0; i < product_list.length; ++i) {
          result.push(product_list[i].name);
      }
      return result;
  }

  const showError = () => {
    return (<Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      This is an error alert — <strong>check it out!</strong>
    </Alert>);
  }
  useEffect(() => {
    async function getUser() {
      const userID = window.localStorage.getItem('user') || "''";
      console.log(userID);
      const user = await GetUserAfterUsername(userID);
      setUser(userID);
      console.log(user.id);

      const product_list = JSON.parse(window.localStorage.getItem('cart') || "[]");
      console.log(createArray(product_list));
      setProduct(createArray(product_list));
    }
    getUser();
  }, [])

  const step1Content = <OrderDet orderDetailsCallback={(orderDet) => orderDetailsCallback(orderDet)} ></OrderDet>;
  const step2Content = <Payment></Payment>;
  const step3Content = <Finish ></Finish>;

  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    if(user !== '')
      return true;
    return false;  
  }

  function step3Validator() {
    // return a boolean
  }

  function onFormSubmit() {
      const requestOptions = {
        method: "POST",
        headers: {
        "X-CSRFToken": GetCookie("csrftoken"),
        "Accept": "application/json",
        'Content-Type': 'application/json'
    },
        body: JSON.stringify({
            status: 'PENDING',
            product: product,
            customer: user,
            contact_person: orderDetails[0],
            phone_number: orderDetails[1],
            delivery_address: orderDetails[2],
        }),
    };

    fetch('/api/add-order', requestOptions).then((response) => {
        if(response.ok) {
            console.log("Am reusit");
            this.props.history.push('/cart');
        }
        else {
            console.log("Eu sunt datele problemei: ");
            console.log("Am esuat rau de tot!");
        }
    }).catch((error) => {
        console.log(error);
    });
  }

    return (
      <div className="App">
        {user === '' ? showError() : null }
        <StepProgressBar
          startingStep={0}
          onSubmit={onFormSubmit}
          steps={[
            {
              label: "Order Details",
              name: "Order Details",
              content: step1Content
            },
            {
              label: "Payment",
              name: "Payment",
              content: step2Content,
              validator: step2Validator
            },
            {
              label: "Finish",
              name: "Finish",
              content: step3Content
            }
          ]}
        />
      </div>
    );
}

export default ProgressBar;