import env from "../config/environments";

import User from "./user";
import UserFriend from "./userFriends";
import UserProfile from "./userProfile";
import UserPost from "./userPosts";
import Message from "./messages";
import Contact from "./contacts";
import Comment from "./comments";
import UserBackground from "./userBackground";
import Photo from "./photos";
import Token from "./token";


(async () => {


    
    // //User with Profile
    User.hasOne(UserProfile, { as :"profile", sourceKey: "id", foreignKey : "userId"});
    UserProfile.belongsTo(User, { foreignKey: "userId"});

    //User with token

    User.hasMany(
        Token,
        { foreignKey: "userId" }
    );
    Token.belongsTo(User, { foreignKey: "userId", });

    //User Profile and contacts
    UserProfile.hasOne(Contact);
    Contact.belongsTo(UserProfile);

    //User  with friends
    //I use one-to-many associate since I want to create a realationship between ONE User who can have multiple friends.
    User.hasMany(UserFriend);
    UserFriend.belongsTo(User);

    //User with Posts
    User.hasMany(UserPost);
    UserPost.belongsTo(User);


    //Post with Comments
    UserPost.hasMany(Comment);
    Comment.belongsTo(UserPost);

    User.hasMany(UserBackground);
    UserBackground.belongsTo(User);

    //User with messages
    User.hasMany(Message, {
        foreignKey: "sourceId"
    });
    Message.belongsTo(User, {
        foreignKey: "sourceId"
    });

    User.hasMany(Message, {
        foreignKey: "targetId",
    })
    Message.belongsTo(User, {
        foreignKey: "targetId",
    });

    UserPost.hasMany(Photo);
    Photo.belongsTo(UserPost);



    


})();



export default {
    User, 
    UserProfile,
    Message,
    Contact,
    Token,
    Photo,
    UserBackground,
    UserPost,
    UserFriend,
    Comment,
}