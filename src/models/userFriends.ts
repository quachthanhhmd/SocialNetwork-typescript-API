import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

import {STATUS} from "../constants/friendStatus.constant";

interface UserFriendAttributes {
    id?: number;
    friendId: number,
    userId: number,
    status?: string;
    isFollow?: Boolean;
}

interface UserFriendCreationAttributes extends Optional<UserFriendAttributes, "id"> { };

class UserFriends extends Model<UserFriendCreationAttributes, UserFriendAttributes>
    implements UserFriendAttributes {
    public readonly id!: number;
    public friendId!: number;
    public userId!: number;
    public status!: string;
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
    status: {
        type: DataTypes.STRING(10),
        validate: {
            isIn: [[STATUS.ACCEPT, STATUS.NOTHING, STATUS.REFUSE, STATUS.SPENDING, STATUS.BLOCKING]],
        },
        defaultValue: STATUS.NOTHING,
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
