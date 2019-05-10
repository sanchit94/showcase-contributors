import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ModalTopAligned = props => (
  <Modal open={props.open} centered={false}>
    <Modal.Header>Do you want to Login?</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Please login to vote</Header>
        <Button><Link to="/login">Login</Link></Button>
        <Button onClick={props.closeModal}>Cancel</Button>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ModalTopAligned