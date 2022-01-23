import React, { useState, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { TextBox } from './TextBox.jsx';
import Feed from './Feed.jsx';
import LoginForm from './LoginForm.jsx';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTracker } from 'meteor/react-meteor-data';
import { PostsCollection } from '/imports/api/PostsCollection';

export default Home = () => {

  let [posts, setPosts] = useState([])

  posts = useTracker(() => PostsCollection.find({}).fetch()) //list of posts
  const user = useTracker(() => Meteor.user()); //current user

  return (
    <>
      
      {user ? ( //if a user is logged in, show the discussion board
          <Fragment>
            <TextBox setPosts={setPosts}/>
            <Container style={{width: 700}}>
              <div className="scroll" style={{padding: "1rem"}}>
                <Feed posts={posts}/>
              </div>
            </Container>
          </Fragment>
          ) : 
      ( //otherwise redirect to login form
        <LoginForm />
      )}
    </>
  );
}
