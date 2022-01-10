import React from "react";
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import Finish from "./Finish";
import OrderDet from "./OrderDetails";
import Payment from "./Payment";


const ProgressBar = () => {

    const step1Content = <OrderDet></OrderDet>;
    const step2Content = <Payment></Payment>;
    const step3Content = <Finish></Finish>;
  
    // setup step validators, will be called before proceeding to the next step
    function step2Validator() {
      return true;
    }
  
    function step3Validator() {
      // return a boolean
    }
    return (
      <div className="App">
        <StepProgressBar
          startingStep={0}
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