import React from "react";

const TransitFinal = (props) => {
    return (
        <h1
        style={{
            color: 'white',
            textAlign:'center',
            padding:'5rem'
          }}> Driver {props.driverUID} will pick you up </h1>
    );
};

export default TransitFinal;