import moment from 'moment';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


const FilterBar = (props) => {
  const { date, setDate } = props;

  const incrementDate = () => {
    // let currentDate = moment(date);
    let newDate = moment(date).add(1, 'months');
    setDate(newDate);
  };

  const decrementDate = () => {
    // let currentDate = moment(date);
    let newDate = moment(date).add(-1, 'months');
    setDate(newDate);
  };

  return (

    <Container className="p-2 mb-4 mt-4 rounded bg-white"style={{ width: "40vw" }}>
      <Row >
        <Col className="d-flex justify-content-center" xs={2} onClick={decrementDate} >
          <ArrowBackIosIcon />
        </Col>

        <Col className="d-flex justify-content-center" xs={8} >
          <b> {moment(date).format("MMMM YYYY")} </b>
        </Col>

        <Col className="d-flex justify-content-center" xs={2} onClick={incrementDate} >
          <ArrowForwardIosIcon />
        </Col>
      </Row>

    </Container>

  );
};

export default FilterBar;