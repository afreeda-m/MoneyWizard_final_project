import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const TransactionModal = (props) => {
  const { isModalOpen, toggleModal, categories, accounts } = props;

  const categoryDropdown = categories.map((category) => {
    return (
      <option key={category.id}>{category.category_name}</option>
    );
  });

  const accountDropdown = accounts.map((account) => {
    return (
      <option key={account.id}>{account.account_name}</option>
    )
  })

  return (
    <Modal show={isModalOpen} onHide={toggleModal} size="lg" centered >

      <Modal.Header className='d-flex justify-content-center'>
        <Modal.Title>NEW TRANSACTION</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {/* This modal has two tabs: Transaction and Transfer */}
        <Tabs defaultActiveKey="transaction" transition={false} className="mb-3" fill >

          <Tab eventKey="transaction" title="Transaction">
            <Form>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Category</InputGroup.Text>
                <Form.Select aria-label="Default select example">
                  <option> </option>
                  {categoryDropdown}

                </Form.Select>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Account</InputGroup.Text>
                <Form.Select aria-label="Default select example">
                  <option> </option>
                  {accountDropdown}

                </Form.Select>
              </InputGroup>

            </Form>

          </Tab>

          <Tab eventKey="transfer" title="Transfer">
            Tab content for Transfer
          </Tab>

        </Tabs>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
        <Button variant="primary" onClick={toggleModal}>
          Save
        </Button>
      </Modal.Footer>

    </Modal>
  );

};

export default TransactionModal;