import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

const DatePickerBox = (props) => {

  const { transactionDate, pickTransactionDate, chosenTransaction } = props;

  return (

    <DatePicker
      sx={{ width: "50%" }}
      value={chosenTransaction ? moment(chosenTransaction.transaction_date) : transactionDate}
      onChange={(newDate) => {
        pickTransactionDate(newDate);
      }}
    />

  );

};

export default DatePickerBox;