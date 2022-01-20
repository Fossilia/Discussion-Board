import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { PostsCollection } from '/imports/api/PostsCollection';

const insertPost = postText => PostsCollection.insert({ poster: poster, postText: postText, likes: likes, dislikes: dislikes });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
