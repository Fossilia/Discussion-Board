import React, { useState, useRef } from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { TextBox } from './TextBox.jsx';
import Feed from './Feed.jsx';
import {Form, Button, Container, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTracker } from 'meteor/react-meteor-data';
import { PostsCollection } from '/imports/api/PostsCollection';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>

export const App = () => {

  let [posts, setPosts] = useState([])

  posts = useTracker(() => PostsCollection.find({}).fetch())

  return (
    <>
      <TextBox setPosts={setPosts}/>
      <Container>
        <div className="scroll" style={{padding: "5rem"}}>
          <Feed posts={posts}/>
        </div>
      </Container>
    </>
  );
}
