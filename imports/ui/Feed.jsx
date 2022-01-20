import React, { useState } from 'react';
import {Form, Button, Container, Card} from 'react-bootstrap';
import Post from './Post.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'

export default Feed = ({ posts }) => {
  return (
     posts.map(post => {
      return <Post key={post.id} post={post} />
    })
  );
};
