import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import { Dropdown } from 'react-bootstrap';

const CategoriesListItem = (props) => {

  const { categoryId, categoryLogo, categoryName, categoryType, deleteCategory } = props;

  const logo = `/frontend/public/images/${categoryLogo}`;

  return (

    <tr>
      {/* {`/backend/src/public/images/${categoryLogo}`} */}
      <td><img alt="Category Logo" src={logo}/></td>
      <td>{categoryName}</td>
      <td>
        <Dropdown>

          <Dropdown.Toggle variant="none" id="dropdown-basic">
            <MoreVertIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu>

            {/* The onClick event on Edit button will open different modal based on the type of the category */}

            <Dropdown.Item className="text-danger text-center" onClick={() => deleteCategory(categoryId, categoryType)}>Delete</Dropdown.Item>

          </Dropdown.Menu>

        </Dropdown>
      </td>
    </tr>


  );
};


export default CategoriesListItem;