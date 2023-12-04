import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import IncomeExpenseListItem from './IncomeExpenseListItem';
import PieChartComponent from './PieChartMoneyWizard';
import { ListGroup } from 'react-bootstrap';

function IncomeExpenseList(props) {

  const {
    categoriesDataByType,
    categoriesData,
    getCategoryIconById,
    getCategoryNameById

  } = props;


  const listOfItems = categoriesDataByType.map((category) => {
    return (
      <IncomeExpenseListItem
        key={category.category_id}
        category={category}
        categoriesData={categoriesData}
        getCategoryIconById={getCategoryIconById}
        getCategoryNameById={getCategoryNameById}
      />
    );
  });



  return (
    <div className='d-flex flex-column justify-content-center' style={{ border: "1px solid" }}>

      <h1>Income</h1>

      <Row style={{ border: "1px solid" }}>
        <PieChartComponent
          data={categoriesDataByType}
        />
      </Row>


      <Row style={{ width: "80%", border: "1px solid" }}>
        <ListGroup>

          {listOfItems}
        </ListGroup>

      </Row>

    </div>

  );
}

export default IncomeExpenseList;