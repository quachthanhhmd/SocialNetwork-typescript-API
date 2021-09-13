import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";


import { TYPETOKEN } from "../constants/token.constant";

interface TokenAttributes {
    id: number,
    type: string,
    expire: Date,
};


interface TokenCreationAttribute extends Optional<TokenAttributes, "id"> { };

export default class Token extends Model<TokenCreationAttribute, TokenAttributes>
    implements TokenAttributes {

    public readonly id!: number;
    public type!: string;
    public expire!: Date;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
};

Token.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
        allowNull: false
    }
}, {
    tableName: "token",
    sequelize,
    paranoid: true,
})