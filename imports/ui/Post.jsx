import React, { useState } from 'react';
import {Card, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { PostsCollection } from '/imports/api/PostsCollection';
import { useTracker } from 'meteor/react-meteor-data';

export default Post = ({ post }) => {
  date = post.createdAt 
  const [month, day, year]       = [date.getMonth(), date.getDate(), date.getFullYear()]
  const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]
  const months = ["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDisLikes] = useState(post.dislikes);
  likeImagePath = "./like.png"
  dislikeImagePath = "./dislike.png"

  const user = useTracker(() => Meteor.user()); //current user
  let email = ""
  if(typeof(user.emails)!='undefined'){ //makes sure email is not undefined
    email = user.emails[0].address
  }

  //updates like/dislike and like/dislike user lists in the db
  const updateReactDB = () => {
    console.log(post.likes+" - "+post.dislikes)
    PostsCollection.update({_id : post._id}, { $set: { likes: post.likes } })
    PostsCollection.update({_id : post._id}, { $set: { dislikes: post.dislikes } })
    PostsCollection.update({_id : post._id}, { $set: { likedList: post.likedList } })
    PostsCollection.update({_id : post._id}, { $set: { dislikedList: post.dislikedList } })
  }

  //updates like/dislike buttons images 
  const updateReactButtons = () => {
    if(typeof post.likedList != 'undefined' && post.likedList.includes(email)){
      likeImagePath = "./like-filled.png"
    }
    else{
      likeImagePath = "./like.png"
    }

    if(typeof post.dislikedList != 'undefined' && post.dislikedList.includes(email)){
      dislikeImagePath = "./dislike-filled.png"
    }
    else{
      dislikeImagePath = "./dislike.png"
    }
  }
  
  updateReactButtons()

  const dislike = () => {
    //check if user already disliked 
    if(typeof post.dislikedList == 'undefined' || !post.dislikedList.includes(email)){
      console.log(post.dislikedList.includes(email))
      console.log(post.dislikedList)
      //check if user liked (if so must remove like)
      if(typeof post.likedList != 'undefined' && post.likedList.includes(email)){
        console.log(post.likedList)
        userIdIndex = post.likedList.indexOf(email)
        post.likedList.splice(userIdIndex, 1)
        console.log(post.likedList)
        post.likes = post.likes-1;
        setLikes(post.likes)
      }
      //add user to dislike list and update dislike count
      post.dislikedList.push(email)
      post.dislikes = post.dislikes+1;
      setDisLikes(post.dislikes)
    }
    else{
      //if dislike button is clicked when already disliked (remove dislike)
      post.dislikedList.splice(post.dislikedList.indexOf(email), 1)
      post.dislikes = post.dislikes-1;
      setDisLikes(post.dislikes)
    }
    updateReactButtons()
    updateReactDB()
  };

  const like = () => {
    //check if user already liked 
    if(typeof post.likedList == 'undefined' || !post.likedList.includes(email)){
      console.log(post.dislikedList.includes(email))
      console.log(post.dislikedList)
      //check if user disliked (if so must remove dislike)
      if(typeof post.dislikedList != 'undefined' && post.dislikedList.includes(email)){
        console.log(post.dislikedList)
        userIdIndex = post.dislikedList.indexOf(email)
        post.dislikedList.splice(userIdIndex, 1)
        console.log(post.dislikedList)
        post.dislikes = post.dislikes-1;
        setDisLikes(post.dislikes)
      }
      //add user to like list and update dislike count
      post.likedList.push(email)
      post.likes = post.likes+1;
      setLikes(post.likes)
    }
    else{
      //if dislike button is clicked when already liked (remove like)
      post.likedList.splice(post.likedList.indexOf(email), 1)
      post.likes = post.likes-1;
      setLikes(post.likes)
    }
    updateReactButtons()
    updateReactDB()
  };

  return (
    <>
      <Card>
          <Card.Body>
            <Card.Text><u>{post.poster}</u></Card.Text>
            <Card.Title>
              {post.postText}
            </Card.Title>
          
            <img className = "clickable-image" src={likeImagePath} style={{width:20, height:20}} onClick={like}/> 
            <label className="reactText">{likes}</label>
            <img className = "clickable-image" src={dislikeImagePath} style={{width:20, height:20}} onClick={dislike}/>
            <label className="reactText">{dislikes}</label>

            <Card.Text style={{fontSize: 12}}>
              {months[month]} {day}, {date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
            </Card.Text>
        </Card.Body>
      </Card>
      <br/>
    </>
  );
};