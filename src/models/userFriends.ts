import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

interface UserFriendAttributes {
    id?: number;
    accepted: Boolean;
    isFollow: Boolean;
}

interface UserFriendCreationAttributes extends Optional<UserFriendAttributes, "id"> { };

class UserFriends extends Model<UserFriendCreationAttributes, UserFriendAttributes>
    implements UserFriendAttributes {
    public readonly id!: number;
    public accepted!: Boolean;
    public isFollow!: Boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserFriends.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isFollow: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: "userfriends",
    sequelize,
});

export default UserFriends;
