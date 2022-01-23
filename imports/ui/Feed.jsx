import React from 'react';
import Post from './Post.jsx';

export default Feed = ({ posts }) => {
  return (
    //renders list of posts
     posts.reverse().map(post => {
      return <Post key={post.id} post={post} />
    })
  );
};
