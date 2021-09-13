import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";
import { STATUS, TYPEBACKGROUND } from "../constants/background.constant";


type UserBackgroundAttributes = {

    id: number,
    status: string,
    link: string,
    type: string,
    description: string,
    name: string,
};

type UserBackgroundCreationAttributes = Optional<UserBackgroundAttributes, "id">;

class UserBackground extends Model<UserBackgroundCreationAttributes, UserBackgroundAttributes> {

    public readonly id!: number;
    public status!: string;
    public link!: string;
    public type!: string;
    public description!: string;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserBackground.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            isIn: [[STATUS.CURRENT, STATUS.PAST]],
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            isIn: [[TYPEBACKGROUND.COLLEGE, TYPEBACKGROUND.HIGHSCHOOL, TYPEBACKGROUND.WORK]],
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        }
    }
}, {
    tableName: "userbackground",
    sequelize,
    paranoid: true,
});



export default UserBackground;


