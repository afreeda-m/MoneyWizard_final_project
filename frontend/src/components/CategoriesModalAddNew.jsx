import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';


function CategoriesModalAddNew(props) {

  const {
    isAddCategoryModalOpen,
    toggleAddCategoryModal,
    postCategoryData,
    setPostCategoryData,
    getCategories,
    iconsData
  } = props;


  // EVENT HANDLING FUNCTIONS
  // Update postCategoryData state upon user input on the form
  const handleInput = (event) => {
    setPostCategoryData({ ...postCategoryData, [event.target.name]: event.target.value });
  };

  // Update logo_url in postCategoryData state upon selection in the drop down list for icon
  const handleIconSelect = (eventKey) => {
    setPostCategoryData({ ...postCategoryData, logo_url: eventKey });
  };

  // Function to handle all events upon closing the Modal
  const handleClose = () => {
    // Reset the postCategoryData state to default
    setPostCategoryData({
      category_name: null,
      type: null,
      logo_url: null,
      user_id: null
    });
    // Close the Modal
    toggleAddCategoryModal();
  };

  // Function to handle form submission
  const handleSubmit = (event) => {

    event.preventDefault();

    // Making a POST request to BE
    axios.post('/categories/add', postCategoryData)
      .then((response) => {
        console.log('logging from handleSubmit function:', response);
        // Invoke getCategories function to  update the categoriesData state from BE
        getCategories();
      })
      .catch((error) => {
        console.error("Error posting new category:", error);
      });

    // Reset the postCategoryData state to default
    setPostCategoryData({
      category_name: null,
      type: null,
      logo_url: null,
      user_id: null
    });
    // Close the Modal
    toggleAddCategoryModal();
  };

  const listOfIcons = iconsData.map((icon) => {
    return (
      <Dropdown.Item key={icon.id} eventKey={icon.logo_url}>
        <img src={`/images/${icon.logo_url}`} alt={icon.logo_url} />
      </Dropdown.Item>
    );
  });


  return (
    <Modal
      style={{ marginLeft: "130px" }}
      show={isAddCategoryModalOpen}
      onHide={handleClose}
      size="md"
      centered
    >

      <Modal.Header>
        <Modal.Title>ADD CATEGORY</Modal.Title>
      </Modal.Header>


      <Modal.Body>

        <Form.Group className='mb-3'>
          <Form.Label >Category name</Form.Label>
          <Form.Control type='text' name="category_name" onChange={handleInput} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label >Category type</Form.Label>
          <Form.Select type="text" name="type" onChange={handleInput}>
            <option>Choose a type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Form.Select>
        </Form.Group>


        <Form.Group>
          <Form.Label>Category Icon</Form.Label>

          <Dropdown onSelect={handleIconSelect}>
            {/* Remove background color with variant "none" and remove down arrow icon by setting id */}
            <Dropdown.Toggle variant="none" id="dropdown-basic" >
              {/* Display a blank blue icon upon modal opening and change into the selected one after selection */}
              {
                postCategoryData.logo_url === null
                  ?
                  <img src='/images/blue.png' alt='icon selection' />
                  :
                  <img src={`/images/${postCategoryData.logo_url}`} alt="selected icon" />
              }
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ width: "100px", height: "400px", overflow: "scroll" }}>
              {listOfIcons}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

      </Modal.Body>


      <Modal.Footer className='d-flex justify-content-around mb-2'>
        <Button type="button" variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button type="submit" variant="success" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>

    </Modal>
  );

}

export default CategoriesModalAddNew;