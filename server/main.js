import { Meteor } from 'meteor/meteor';
import { PostsCollection } from '/imports/api/PostsCollection';

const insertPost = postText => PostsCollection.insert({ poster: poster, postText: postText, likes: likes, dislikes: dislikes });

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  
});
