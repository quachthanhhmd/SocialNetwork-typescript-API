import {
    DataTypes,
    Optional,
    Model,
} from "sequelize";

import { sequelize } from "../config/sequelize";

interface ContactAttributes {
    id: number,
    email?: string | null,
    phoneNumber?: string,
    skype: string | null,
    github: string | null,
    linkedin: string | null,
    profileId: number,
}

interface ContactCreationAtributes extends Optional<ContactAttributes, "id"> { };

class Contact extends Model<ContactCreationAtributes, ContactAttributes>
    implements ContactAttributes {
    public readonly id!: number;
    public email!: string;
    public skype!: string;
    public phoneNumber!: string;
    public github!: string;
    public linkedin!: string;
    public profileId!: number;

    
    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
}

Contact.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /(84|0[3|5|7|8|9])+([0-9]{8})\b/i,
        }
    },
    skype: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        }
    },
    github: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        }
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        }
    },
    profileId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "userprofile",
            key: 'id',          
        }
    }
}, {
    tableName: "contact",
    sequelize,
})


export default Contact;

