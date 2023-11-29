import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import moment from 'moment';

const FilterBar = ({ date, setDate, updateSelectedMonthAndYear }) => {
  
    const handleDateChange = (amount) => {
      const newDate = moment(date).add(amount, 'months');
      setDate(newDate);
      updateSelectedMonthAndYear(newDate);
    };

  return (
    <Container className="p-2 mb-4 mt-4 rounded bg-white" style={{ width: "40vw" }}>
      <Row>
        <Col className="d-flex justify-content-center" xs={2} onClick={() => handleDateChange(-1)}>
          <ArrowBackIosIcon />
        </Col>
        <Col className="d-flex justify-content-center" xs={8}>
          <b> {moment(date).format("MMMM YYYY")} </b>
        </Col>
        <Col className="d-flex justify-content-center" xs={2} onClick={() => handleDateChange(1)}>
          <ArrowForwardIosIcon />
        </Col>
      </Row>
    </Container>
  );
};

export default FilterBar;
