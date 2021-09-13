import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

interface CommentAttributes {

    id?: number,
    content: string,
    isChange: Boolean,
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> { };

class Comment extends Model<CommentCreationAttributes, CommentAttributes>
    implements CommentAttributes {

    public readonly id!: number;
    public content!: string;
    public isChange!: Boolean;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Comment.init({
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
    }
}, {
    tableName: "Comments",
    sequelize,
    paranoid: true,
});

export default Comment;