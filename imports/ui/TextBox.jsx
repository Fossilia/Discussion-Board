import React, {useRef } from 'react';
import {Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { v4 as uuidv4 } from 'uuid';
import { useTracker } from 'meteor/react-meteor-data';
import { PostsCollection } from '/imports/api/PostsCollection';
import { Meteor } from 'meteor/meteor';

export const TextBox = ({setPosts}) => {

  const postRef = useRef() //get what the user types in their post
  const user = useTracker(() => Meteor.user()); //current user
  let email = ""
  if(typeof(user.emails)!='undefined'){ //makes sure email is not undefined
    email = user.emails[0].address
  }

  function createPost(e){
      const postText = postRef.current.value
      const postId = uuidv4() //generate random ID
      if(postText == ''){
        return
      }
      else{
        setPosts(prevPosts => {  //add a new post to the previous post list
          return [...prevPosts, {id:postId, poster:email, postText:postText, likes: 0, dislikes:0, likedList: [], dislikedList: [], createdAt: new Date()}]
        })

        PostsCollection.insert({ //insert post into MongDB 
          id: postId,
          poster:email,
          postText: postText.trim(),
          likes: 0,
          dislikes: 0,
          likedList: [],
          dislikedList: [],
          createdAt: new Date()
        });

        postRef.current.value = null; //clear post area
      }
  }

  return (
    <>
    <Container style={{width:800}}>
    <div style={{padding: "1rem"}}>
        <div className="form-group">
            <h4 style={{paddingBottom: "1rem"}}>
              Logged in as: <u>{email}</u>
            </h4>
            <textarea
              ref = {postRef /*where the post text is recieved from */} 
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
