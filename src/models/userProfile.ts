import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";


import { FEMALE, MALE, OTHER } from "../constants/gender.constant";


interface UserProfileAttributes {
    id?: number,
    firstName: string,
    lastName: string,
    backgroundImage?: string | null,
    gender: string,
    birthDay: Date,
    lastLogin?: Date | null,
    avtImage?: string | null,
    displayName?: string,
    userId?: number
}

interface UserProfileCreationAttributes extends Optional<UserProfileAttributes, "id"> { };

class UserProfile extends Model<UserProfileCreationAttributes, UserProfileAttributes>
    implements UserProfileAttributes {

    public readonly id!: number;
    public firstName!: string;
    public lastName!: string;
    public readonly displayName!: string;
    public backgroundImage!: string | null;
    public gender!: string;
    public birthDay!: Date;
    public lastLogin!: Date | null;
    public avtImage!: string | null;
    public readonly userId!: number;


    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
}

UserProfile.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    displayName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
            throw new Error('Do not try to set the `displayName` value!');
        }
    },
    gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            isIn: [[FEMALE, MALE, OTHER]],
        }
    },
    birthDay: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        set(value: string | Date){
            if (typeof value === "string")
                this.setDataValue("birthDay", new Date(value));
            else
                this.setDataValue("birthDay", value);
        },
        validate: {
            isBefore: new Date().toLocaleDateString(),
        }
    },
    backgroundImage: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        }
    },
    avtImage: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        }
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
    tableName: 'userprofile',
    sequelize,
})


export default UserProfile;

