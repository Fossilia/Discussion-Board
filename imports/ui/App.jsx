import React, { useState, useRef, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { TextBox } from './TextBox.jsx';
import Feed from './Feed.jsx';
import Home from './Home.jsx';
import LoginForm from './LoginForm.jsx';
import {Form, Button, Container, Card, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTracker } from 'meteor/react-meteor-data';
import { PostsCollection } from '/imports/api/PostsCollection';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';


<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>

export const App = () => {

  let [posts, setPosts] = useState([])

  posts = useTracker(() => PostsCollection.find({}).fetch())
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  return (
      <>
      <BrowserRouter>

      {user ? (
          <Fragment>
          <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Foss Board</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link onClick={logout}>Log out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </Fragment>
          ) : 
      (
        <Fragment>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Foss Board</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link><Link to="/">Log in</Link></Nav.Link>
          <Nav.Link><Link to="/Register">Register</Link></Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Fragment>
      )}
      
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
