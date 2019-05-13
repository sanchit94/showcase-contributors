import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function(props) {
  return(
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
  );
}