import React, { useState } from 'react';
import {Form, Button, Container, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

export default Post = ({ post }) => {
date = post.createdAt
const [month, day, year]       = [date.getMonth(), date.getDate(), date.getFullYear()]
const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]
const months = ["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
  return (
    <>
      <Card>
          <Card.Body>
            <Card.Text><u>{post.poster}</u></Card.Text>
            <Card.Title>
              {post.postText}
            </Card.Title>
            <Card.Text style={{fontSize: 12}}>
              {months[month]} {day}, {date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
            </Card.Text>
        </Card.Body>
      </Card>
      <br/>
    </>
  );
};