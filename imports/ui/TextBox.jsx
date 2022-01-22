import React, { useState, useRef } from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import { v4 as uuidv4 } from 'uuid';
import { useTracker } from 'meteor/react-meteor-data';
import { PostsCollection } from '/imports/api/PostsCollection';
import { Meteor } from 'meteor/meteor';

export const TextBox = ({setPosts}) => {

  const postRef = useRef()
  const user = useTracker(() => Meteor.user());

  function createPost(e){
      const postText = postRef.current.value
      const postId = uuidv4()
      if(postText == ''){
        return
      }
      else{
        setPosts(prevPosts => {
          console.log("added post")
          return [...prevPosts, {id:postId, poster:user.email, postText:postText, likes: 0, dislikes:0}]
        })

        PostsCollection.insert({
          id: postId,
          poster:user.email,
          postText: postText.trim(),
          likes: 0,
          dislikes: 0,
          createdAt: new Date()
        });

        postRef.current.value = null;
      }
  }

  return (
    <>
    <Container>
    <div style={{padding: "1rem"}}>
        <div className="form-group">
            <label htmlFor="postTextArea" style={{paddingBottom: "1rem"}}>
              Logged in as: {user.email}
            </label>
            <textarea
            ref = {postRef}
            className="form-control"
            id="postTextArea"
            rows="5"
            placeholder="what are you thinking about today?"
            />
        </div>
      <br/>
      <Button className="submit-button" onClick={createPost} value="submit" type="submit">Post</Button>
    </div>
    </Container>
    <hr/>
    </>
  );
};
