import React from "react";

const TransitMatched = (props) => {
    return (
        <h1
        style={{
            color: 'white',
            padding: '5rem',
            textAlign: 'center'
          }}> You have been matched to {props.driverUID} </h1>
          
    );
};

export default TransitMatched;