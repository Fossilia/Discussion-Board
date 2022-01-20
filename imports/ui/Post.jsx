import React, { useState } from 'react';
import {Form, Button, Container, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

export default Post = ({ post }) => {
  return (
    <>
      <Card>
          <Card.Body>
            <Card.Title>{post.poster}</Card.Title>
            <Card.Text>
              {post.postText}
            </Card.Text>
        </Card.Body>
      </Card>
      <br/>
    </>
  );
};