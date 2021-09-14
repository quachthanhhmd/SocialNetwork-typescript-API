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


export const associate = async () => {


    //DON'T DROP ALL TABLE IN OTHER TYPES EXCEPT DEVELOPMENT
    if (env.TYPE === "development") {
        await Token.drop();
        await Photo.drop();
        await UserBackground.drop();
        await Comment.drop();
        await UserPost.drop();
        await Message.drop();
        await Contact.drop();
        await UserProfile.drop();
        await UserPost.drop();
        await UserFriend.drop();
        await User.drop();
    }

    // //User with Profile
    User.hasOne(UserProfile);
    UserProfile.belongsTo(User);

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



    await User.sync({ force: true });
    await UserPost.sync({ force: true });
    await UserProfile.sync({ force: true });
    await Contact.sync({ force: true });
    await Message.sync({ force: true });
    await UserFriend.sync({ force: true });
    await Comment.sync({ force: true });
    await Photo.sync({ force: true });
    await UserBackground.sync({ force: true });
    await Token.sync({ force: true });
}

