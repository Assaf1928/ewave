import React, { useState } from 'react';
import {Modal,Button,Form} from 'react-bootstrap';

const MovieModal = (props) => {

  
    return (
      <>
        <Button variant="primary" onClick={props.modalShow}>
            Add New Movie
        </Button>
  
        <Modal show={props.show} onHide={props.modalClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                    <Form>
            <Form.Group controlId="formGroupMovieName">
                <Form.Label>Movie Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter movie name"  onChange={props.onChange} name="Name" />
            </Form.Group>
            <Form.Group controlId="formGroupMovieCategory">
                <Form.Label>Movie Category: </Form.Label>
                <Form.Control as="select"  onChange={props.onChange} name="Category" >
                                <option value="0">Choose Category</option>
                                {props.categories}
                 </Form.Control>

                 <Form.Group controlId="formGroupMovieRate">
                    <Form.Label>Rate</Form.Label>
                    <Form.Control onChange={props.onChange} name="Rate" type="range" />
                </Form.Group>
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.modalClose}>
              Close
            </Button>
                    <Button variant="primary" onClick={props.addMovie}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default MovieModal;