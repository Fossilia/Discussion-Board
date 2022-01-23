import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { PostsCollection } from '/imports/api/PostsCollection';

const insertPost = postText => PostsCollection.insert({ poster: poster, postText: postText, likes: likes, dislikes: dislikes });

const SEED_EMAIL = 'meteorite@gmail.com';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (!Accounts.findUserByEmail(SEED_EMAIL)) { //sets up default account
    Accounts.createUser({
      email: SEED_EMAIL,
      password: SEED_PASSWORD,
    });
  }
});
