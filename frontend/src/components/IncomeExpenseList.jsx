import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import IncomeExpenseListItem from './IncomeExpenseListItem';
import PieChartComponent from './PieChartMoneyWizard';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';

function IncomeExpenseList(props) {

  const {
    categoriesDataByType,
    categoriesData,
    getCategoryIconById,
    getCategoryNameById,
    isIncome,
    total

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
    <div className='d-flex flex-column justify-content-start align-items-center' >

      <h3>
        {isIncome === true ? "Income" : "Expense"}
      </h3>

      <Row >
        <PieChartComponent
          data={categoriesDataByType}
        />
      </Row>


      <Row className="mt-4" style={{ width: "100%" }}>

        <ListGroup >
          <ListGroupItem className="d-flex justify-content-center" style={{ fontSize: '20px' }}>
            <b>
                <span>{isIncome === true ? "Total Income: $" : "Total Expense: $"}</span>
                <NumericFormat
                  value={total.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                />
            </b>
          </ListGroupItem>

          {listOfItems}

        </ListGroup>

      </Row>

    </div>

  );
}

export default IncomeExpenseList;