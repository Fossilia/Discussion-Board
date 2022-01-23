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
  //const currentUserEmail = Meteor.user() ? Meteor.user().emails[0].address : '' 

  function createPost(e){
      const postText = postRef.current.value
      const postId = uuidv4()
      if(postText == ''){
        return
      }
      else{
        setPosts(prevPosts => {
          console.log("added post")
          console.log(user.emails.address)
          return [...prevPosts, {id:postId, poster:user.emails[0].address, postText:postText, likes: 0, dislikes:0, createdAt: new Date()}]
        })

        PostsCollection.insert({
          id: postId,
          poster:user.emails[0].address,
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
    <Container style={{width:800}}>
    <div style={{padding: "1rem"}}>
        <div className="form-group">
            <h4 style={{paddingBottom: "1rem"}}>
              Logged in as: {user.emails[0].address}
            </h4>
            <textarea
            ref = {postRef}
            className="form-control"
            id="postTextArea"
            rows="5"
            text-align="center"
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
