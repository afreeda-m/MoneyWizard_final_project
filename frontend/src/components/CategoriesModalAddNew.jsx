import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function CategoriesModalAddNew(props) {

  const {
    isAddCategoryModalOpen,
    toggleAddCategoryModal,
    postCategoryData,
    setPostCategoryData,
    getCategories
  } = props;

  // Update postCategoryData state upon user input on the form
  const handleInput = (event) => {
    console.log(postCategoryData);
    setPostCategoryData({ ...postCategoryData, [event.target.name]: event.target.value });
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

    // Close the Modal
    toggleAddCategoryModal();
  };



  return (
    <Modal
      style={{ marginLeft: "130px" }}
      show={isAddCategoryModalOpen}
      onHide={handleClose}
      size="sm"
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
            <option></option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Form.Select>
        </Form.Group>


        {/* TO BE REVIEWED: Need to find a way to display the bank of images and set the value to the image path on user selection */}
        <Form.Group>
          <Form.Label>Category Icon</Form.Label>
          <Form.Control name="logo_url" onChange={handleInput}></Form.Control>
        </Form.Group>

      </Modal.Body>

      <Modal.Footer className='d-flex justify-content-around mb-2'>

        <Button type="button" variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button type="submit" variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>

    </Modal>
  );

}

export default CategoriesModalAddNew;