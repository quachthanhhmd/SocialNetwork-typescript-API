import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";



//I only for user post text.
interface UserPostAttributes {

    id?: number,
    content: string,
    isChange?: Boolean,
    isHidden?: Boolean,
    userId: number,
    emoji?: string,
}

interface UserPostCreationAttributes extends Optional<UserPostAttributes, "id"> { };

class UserPosts extends Model<UserPostCreationAttributes, UserPostAttributes>
    implements UserPostAttributes {
    public readonly id!: number;
    public content!: string;
    public isChange!: Boolean;
    public isHidden!: Boolean;
    public userId!: number;
    public emoji!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


UserPosts.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    isChange: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isHidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userId: {
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "user",
            key: 'id',
        }
    }
}, {
    tableName: "userposts",
    sequelize,
    paranoid: true,

})



export default UserPosts;