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

  const [paymentDetails, setPaymentDetails] = useState([]);

  const paymentCallback = (paymentDet) => {
    setPaymentDetails(paymentDet);
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

  const showError = (message1, message2) => {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message1} — <strong>{message2} </strong>
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
  const step2Content = <Payment paymentCallback={(paymentDet) => paymentCallback(paymentDet)} ></Payment>;
  const step3Content = <Finish ></Finish>;

  const [errorNext, setErrorNext] = useState('');

  function step1Validator() {
    var tmpUser = window.localStorage.getItem('user') || "''";
    var tmpProduct = JSON.parse(window.localStorage.getItem('cart') || "[]");
    console.log(tmpProduct);
    if(tmpUser === "''" || typeof tmpUser === 'undefined' || tmpProduct === [] 
      || typeof tmpProduct === 'undefined' || tmpProduct.length === 0)
      return false;
    console.log("Am trecut de if");
    console.log(orderDetails);

    return true;  
  }

  function step2Validator() {
      return true;
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
        {user === '' ? showError("You are not logged in", "Go to login page!") : null }
        {product.length === 0 || product === [] ? showError("You cart is empty", "Go buy something!") : null }
        {/* {errorNext === 'false' ? showError("You haven't completed order details", "Please complete them!") : null } */}

        <StepProgressBar
          startingStep={0}
          onSubmit={onFormSubmit}
          steps={[
            {
              label: "Order Details",
              name: "Order Details",
              content: step1Content,
              validator: step1Validator
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