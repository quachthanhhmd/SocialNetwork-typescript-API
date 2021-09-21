import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";


interface PhotoAttributes {

    id?: number,
    imageLink: string,
    postId: number,
};


interface PhotoCreationAttributes extends Optional<PhotoAttributes, "id"> { };

class Photo extends Model<PhotoCreationAttributes, PhotoAttributes>
    implements PhotoAttributes {
    public readonly id!: number;
    public imageLink!: string;
    public postId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Photo.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    imageLink: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        }
    },
    postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "userposts",
            key: "id"
        }
    }
}, {
    tableName: "photos",
    sequelize,
    paranoid: true,
})

export default Photo;