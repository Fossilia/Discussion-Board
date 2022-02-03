import React, { useState } from 'react';
import {Card, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { PostsCollection } from '/imports/api/PostsCollection';

export default Post = ({ post }) => {
  date = post.createdAt 
  const [month, day, year]       = [date.getMonth(), date.getDate(), date.getFullYear()]
  const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]
  const months = ["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDisLikes] = useState(post.dislikes);
  likeImagePath = "./like.png"
  dislikeImagePath = "./dislike.png"

  const updateReactDB = () => {
    PostsCollection.update(post.id, { $set: { likes: post.likes } })
    PostsCollection.update(post.id, { $set: { dislikes: post.dislikes } })
    PostsCollection.update(post.id, { $set: { likedList: post.likedList } })
    PostsCollection.update(post.id, { $set: { doslikedList: post.dislikedList } })
  }

  const updateReactButtons = () => {
    if(typeof post.likedList != 'undefined' && post.likedList.includes(post.poster)){
      likeImagePath = "./like-filled.png"
    }
    else{
      likeImagePath = "./like.png"
    }

    if(typeof post.dislikedList != 'undefined' && post.dislikedList.includes(post.poster)){
      dislikeImagePath = "./dislike-filled.png"
    }
    else{
      dislikeImagePath = "./dislike.png"
    }
  }
  
  updateReactButtons()

  const like = () => {
    if(typeof post.likedList == 'undefined' || !post.likedList.includes(post.poster)){
      if(typeof post.dislikedList != 'undefined' && post.dislikedList.includes(post.poster)){
        console.log(post.dislikedList)
        userIdIndex = post.dislikedList.indexOf(post.poster)
        post.dislikedList.splice(userIdIndex, 1)
        console.log(post.dislikedList)
        post.dislikes = post.dislikes-1;
        setDisLikes(post.dislikes)
      }
      post.likedList.push(post.poster)
      post.likes = post.likes+1;
      setLikes(post.likes)
      console.log(post.likes)
      console.log(post.likedList)
    }
    else{
      console.log("already liked!")
      post.likedList.splice(post.likedList.indexOf(post.poster), 1)
      post.likes = post.likes-1;
      setLikes(post.likes)
    }
    updateReactButtons()
    updateReactDB()
  };

  const dislike = () => {
    if(!post.dislikedList.includes(post.poster)){
      if(post.likedList.includes(post.poster)){
        console.log(post.likedList)
        userIdIndex = post.likedList.indexOf(post.poster)
        post.likedList.splice(userIdIndex, 1)
        console.log(post.likedList)
        post.likes = post.likes-1;
        setLikes(post.likes)
      }
      post.dislikedList.push(post.poster)
      post.dislikes = post.dislikes+1;
      setDisLikes(post.dislikes)
      console.log(post.dislikes)
      console.log(post.dislikedList)
    }
    else{
      console.log("already liked!")
      post.dislikedList.splice(post.dislikedList.indexOf(post.poster), 1)
      post.dislikes = post.dislikes-1;
      setDisLikes(post.dislikes)
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