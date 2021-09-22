import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";


interface EmojiAttributes {
    id?: number,
    sad?: number,
    wow?: number,
    haha?: number,
    angry?: number,
    love?: number,
    care?: number,
    like?: number,
    postId: number,
}

interface EmojiCreationAttributes extends Optional<EmojiAttributes, "id"> { };


class Emoij extends Model<EmojiCreationAttributes, EmojiAttributes> implements EmojiAttributes {
    public readonly id!: number;
    public sad!: number;
    public wow!: number;
    public haha!: number;
    public angry!: number;
    public love!: number;
    public care!: number;
    public like!: number;
    public postId!: number;
};

Emoij.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    sad: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
    },
    wow: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
    },
    haha: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
    },
    angry: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
    },
    love: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
    },
    care: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
    },
    like: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
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