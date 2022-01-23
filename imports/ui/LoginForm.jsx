import { Meteor } from 'meteor/meteor';
import React, { useState, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisterForm from './RegisterForm.jsx';
import App from './App.jsx';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {Form, Button, Container, Card, Navbar, Nav, NavDropdown} from 'react-bootstrap';

export default LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, function(error){
      if(error){
        alert(error.reason);
      }
    });
  };

  return (
    <Container style={{width:700}}> 
     

        <br/>
        <h1 align="center">Log in</h1>
        <Form onSubmit={submit} className="login-form" style={{padding: "1rem"}}>
        <label>Email</label>
        <br/>
        <div className="input-group mb-3">
            
            <input
            type="text"
            className="form-control"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <label>Password</label>
        <br/>
        <div className="input-group">

            <input
            type="password"
            className="form-control"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div style={{paddingTop: "1rem"}}>
            <Button type="submit">Log In</Button>
            <br/><label>Don't have an account? <Link to="/register">Register here</Link></label>
        </div>
    </Form>
    </Container>
  );
};