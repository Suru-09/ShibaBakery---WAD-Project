import React from "react";
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import OrderDet from "./OrderDetails";


const ProgressBar = () => {

    const step1Content = <OrderDet></OrderDet>;
    const step2Content = <h1></h1>;
    const step3Content = <h1></h1>;
  
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