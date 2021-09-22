import { EMOIJ } from './../constants/emoji.constant';
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";


interface EmojiAttributes {
    id?: number,
    type?: string,
    userId: number,
    postId: number,
}

interface EmojiCreationAttributes extends Optional<EmojiAttributes, "id"> { };


class Emoij extends Model<EmojiCreationAttributes, EmojiAttributes> implements EmojiAttributes {
    public readonly id!: number;
    public type!: string;
    public readonly userId!: number;
    public readonly postId!: number;
};

Emoij.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING(10),
        defaultValue: EMOIJ.NONE,
        validate: {
            isIn: [[EMOIJ.ANGRY, EMOIJ.CARE, EMOIJ.HAHA, EMOIJ.LIKE, EMOIJ.LOVE, EMOIJ.NONE, EMOIJ.SAD, EMOIJ.WOW]]
        }
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        }
    },
    postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "userposts",
            key: 'id',
        }
    }
}, {
    tableName: "emoij",
    sequelize
})

export default Emoij;