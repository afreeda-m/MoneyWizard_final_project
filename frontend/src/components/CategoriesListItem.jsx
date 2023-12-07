import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

const CategoriesListItem = (props) => {

  const {
    categoryId,
    categoryIcon,
    categoryName,
    getCategories,
    categoryUserId
  } = props;


  // Function for deleting a category
  // TO BE DISCUSSED: Can user delete base categories, if not then maybe we should send an alert box when a base category is being deleted
  const handleDelete = () => {
    axios.post(`/categories/${categoryId}/delete`)
      .then((response) => {
        getCategories();
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
      });
  };


  return (
    <ListGroupItem className="p-2" style={{ width: "30vw" }}>
      {/* Using React Bootstrap Grid layout with 1 row and 3 columns */}
      <Container>
        <Row className="d-flex align-items-center">

          {/* 1st column for category icon */}
          <Col className="d-flex justify-content-center" xs={2}>
            <Image src={categoryIcon} />
          </Col>

          {/* 2nd column for category name */}
          <Col xs={9}>
            {categoryName}
          </Col>

          {/* 3rd column for the 3 dots dropdown button */}
          <Col className="d-flex justify-content-end" xs={1}>
            <Dropdown>

              <Dropdown.Toggle variant="none" id="dropdown-basic">
                <MoreVertIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* disable the delete feature for preset categories */}
                {categoryUserId === null
                  ?
                  <Dropdown.Item className='text-center' disabled>Delete category</Dropdown.Item>
                  :
                  <Dropdown.Item onClick={handleDelete} className='text-center text-danger'>Delete category</Dropdown.Item>
                }
              </Dropdown.Menu>

            </Dropdown>
          </Col>

        </Row>
      </Container>
    </ListGroupItem>

  );
};


export default CategoriesListItem;