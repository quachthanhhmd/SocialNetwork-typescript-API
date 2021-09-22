import db from "./models/index";

import User from "./models/user";
import UserFriend from "./models/userFriends";
import UserProfile from "./models/userProfile";
import UserPost from "./models/userPosts";
import Message from "./models/messages";
import Contact from "./models/contacts";
import Comment from "./models/comments";
import UserBackground from "./models/userBackground";
import Photo from "./models/photos";
import Token from "./models/token";
import Emoij from "./models/emoij";

(async () => {

    //DON'T DROP ALL TABLE IN OTHER TYPES EXCEPT DEVELOPMENT

    await Emoij.drop();
    await Token.drop();
    await Photo.drop();
    await UserBackground.drop();
    await Comment.drop();
    await Message.drop();
    await Contact.drop();
    await UserProfile.drop();
    await UserPost.drop();
    await UserFriend.drop();
    await User.drop();


    db;

    
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
    await Emoij.sync({ force: true });
})();