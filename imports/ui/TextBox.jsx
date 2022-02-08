import React, {useRef } from 'react';
import {Button, Container, Form} from 'react-bootstrap';
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

  const createPost = e => { 
      e.preventDefault();
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

  /*function submitOnEnter(event){
    if(event.which === 13 && !event.shiftKey){
       handleSubmit(onSubmit)();
       event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
    }
  }*/

  return (
    <>
    <Container style={{width:800}}>
      <Form onSubmit={createPost}>
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
        <Button type="submit">Post</Button>
      </div>
      </Form>
    </Container>
    <hr/>
    </>
  );
};
