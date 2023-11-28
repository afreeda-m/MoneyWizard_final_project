import { DatePicker } from "@mui/x-date-pickers";

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