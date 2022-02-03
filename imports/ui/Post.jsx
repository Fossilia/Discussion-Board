import React, { useState } from 'react';
import {Card, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

export default Post = ({ post }) => {
date = post.createdAt 
const [month, day, year]       = [date.getMonth(), date.getDate(), date.getFullYear()]
const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]
const months = ["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
const [likes, setLikes] = useState(post.likes);
const [dislikes, setDisLikes] = useState(post.dislikes);

const like = () => {
  if(!post.likedList.includes(post.poster)){
    if(post.dislikedList.includes(post.poster)){
      console.log(post.dislikedList)
      userIdIndex = dislikedList.indexOf(post.poster)
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
  }
};

const dislike = () => {
  if(!post.dislikedList.includes(post.poster)){
    post.dislikedList.push(post.poster)
    post.dislikes = post.dislikes+1;
    setDisLikes(post.dislikes)
    console.log(post.dislikes)
    console.log(post.dislikedList)
  }
  else{
    console.log("already disliked!")
  }
};

  return (
    <>
      <Card>
          <Card.Body>
            <Card.Text><u>{post.poster}</u></Card.Text>
            <Card.Title>
              {post.postText}
            </Card.Title>
            <br/>
            <Button onClick={like}>
              <img src={"./like.png"} style={{width:20, height:20}}/> 
            </Button>
            <label className="reactText">{post.likes}</label>
            <Button onClick={dislike}>
              <img src={"./dislike.png"} style={{width:20, height:20}}/>
            </Button>
            <label className="reactText">{post.dislikes}</label>

            <Card.Text style={{fontSize: 12}}>
              {months[month]} {day}, {date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
            </Card.Text>
        </Card.Body>
      </Card>
      <br/>
    </>
  );
};