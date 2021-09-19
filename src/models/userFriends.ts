import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

interface UserFriendAttributes {
    id?: number;
    friendId: number,
    userId: number,
    isAccepted?: Boolean;
    isFollow: Boolean;
}

interface UserFriendCreationAttributes extends Optional<UserFriendAttributes, "id"> { };

class UserFriends extends Model<UserFriendCreationAttributes, UserFriendAttributes>
    implements UserFriendAttributes {
    public readonly id!: number;
    public friendId!: number;
    public userId!: number;
    public isAccepted!: Boolean;
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
    isAccepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isFollow: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    friendId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        },
    }
}, {
    tableName: "userfriends",
    sequelize,
});

export default UserFriends;
