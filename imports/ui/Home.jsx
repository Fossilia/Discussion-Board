import React, { useState, useRef, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { TextBox } from './TextBox.jsx';
import Feed from './Feed.jsx';
import LoginForm from './LoginForm.jsx';
import {Form, Button, Container, Card, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTracker } from 'meteor/react-meteor-data';
import { PostsCollection } from '/imports/api/PostsCollection';

export default Home = () => {

  let [posts, setPosts] = useState([])

  posts = useTracker(() => PostsCollection.find({}).fetch())
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  return (
    <>
      {user ? (
          <Fragment>
            <TextBox setPosts={setPosts}/>
            <Container>
              <div className="scroll" style={{padding: "5rem"}}>
                <Feed posts={posts}/>
              </div>
            </Container>
          </Fragment>
          ) : 
      (
        <LoginForm />
      )}
    </>
  );
}
