import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

const DatePickerBox = (props) => {

  const { transactionDate, pickTransactionDate, chosenTransaction, changePostTransactionDate } = props;

  const handleChange = (newDate) => {
    changePostTransactionDate(newDate);
    pickTransactionDate(newDate);
  };

  return (

    <DatePicker
      sx={{ width: "50%" }}
      value={chosenTransaction ? moment(chosenTransaction.transaction_date) : transactionDate}
      onChange={handleChange}
    />

  );

};

export default DatePickerBox;