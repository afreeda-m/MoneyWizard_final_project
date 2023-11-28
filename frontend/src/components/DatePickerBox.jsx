import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useState } from "react";

const DatePickerBox = (props) => {

  const { transactionDate, pickTransactionDate } = props;

  return (


    <DatePicker
      sx={{ width: "50%" }}
      value={transactionDate}
      onChange={(newDate) => {
        pickTransactionDate(newDate);
      }}
    />


  );

};

export default DatePickerBox;