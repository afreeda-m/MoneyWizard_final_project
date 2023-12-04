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
    getCategoryNameById,
    isIncome

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

      <h1>
        {isIncome === true ? "Income" : "Expense"}
      </h1>

      <Row style={{ border: "1px solid", width: "80%" }}>
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