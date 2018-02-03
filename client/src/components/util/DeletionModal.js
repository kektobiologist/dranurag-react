import React from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";

export default ({ toggle, show, onDeleteClicked, title, body }) => (
  <Modal isOpen={show} toggle={toggle}>
    <ModalHeader toggle={toggle}>{title}</ModalHeader>
    <ModalBody>{body}</ModalBody>
    <ModalFooter>
      <Button color="danger" onClick={onDeleteClicked}>
        Delete
      </Button>{" "}
      <Button color="secondary" onClick={toggle}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);
