import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from "react-bootstrap/Col";
import IncomeExpenseListItem from './IncomeExpenseListItem';
import PieChartComponent from './PieChartMoneyWizard';

function IncomeExpenseListNew(props) {

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
    <>

      <Row>
        <PieChartComponent
          data={categoriesDataByType}
        />
      </Row>


      <Row>
        {listOfItems}

      </Row>

    </>

  );
}

export default IncomeExpenseListNew;