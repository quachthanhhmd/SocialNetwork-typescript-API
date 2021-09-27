import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";


import { TYPETOKEN } from "../constants/token.constant";

interface TokenAttributes {
    id?: number,
    token: string,
    type: string,
    expire: Date,
    userId: number
};


interface TokenCreationAttribute extends Optional<TokenAttributes, "id"> { };

export default class Token extends Model<TokenCreationAttribute, TokenAttributes>
    implements TokenAttributes {

    public readonly id!: number;
    public token!: string;
    public type!: string;
    public expire!: Date;
    public userId!: number;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
};

Token.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [[TYPETOKEN.REFRESH, TYPETOKEN.RESET_PASSWORD, TYPETOKEN.VERIFY_EMAIL]],
        }
    },
    expire: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isAfter: new Date().toLocaleDateString(),
        }
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
}, {
    tableName: "token",
    sequelize,
    paranoid: true,
})