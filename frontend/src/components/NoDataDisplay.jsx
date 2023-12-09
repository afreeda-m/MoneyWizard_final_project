import React from 'react';
import Alert from "react-bootstrap/Alert";

function NoDataDisplay() {
  return (
    <Alert variant="success" style={{width: "100%"}}>
      <Alert.Heading>Hello!</Alert.Heading>
      <p>
        No data are available.
      </p>
      <hr />
      <p className="mb-0">
        Consider adding some transactions to this month!
      </p>
    </Alert>
  );
}

export default NoDataDisplay;