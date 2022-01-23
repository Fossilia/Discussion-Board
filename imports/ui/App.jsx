import React, { useState, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import Home from './Home.jsx';
import RegisterForm from './RegisterForm.jsx';
import LoginForm from './LoginForm.jsx';
import {Container, Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTracker } from 'meteor/react-meteor-data';
import { PostsCollection } from '/imports/api/PostsCollection';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

export const App = () => {

  let [posts, setPosts] = useState([]) 

  posts = useTracker(() => PostsCollection.find({}).fetch()) //get list of posts
  const user = useTracker(() => Meteor.user()); //get list of users
  const logout = () => Meteor.logout();

  return (
      <>
      <BrowserRouter>

      {user ? ( //if the user is logged in, show user navbar
          <Fragment>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand>Foss Board</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              <Nav.Item onClick={logout}>Log out</Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
        </Fragment>
          ) : 
      ( //otherwise show visiter navbar
        <Fragment>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Foss Board</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Item><Link to="/">Log in</Link>&nbsp;&nbsp;</Nav.Item>
          <Nav.Item><Link to="/Register">Register</Link></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Fragment>
      )}
      {/*Switched and Routes used to create different pages*/}
      <Switch> 
        <Route exact path="/"> 
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/register">
          <RegisterForm />
        </Route>
      </Switch>

      </BrowserRouter>
      </>
    
  );
}
