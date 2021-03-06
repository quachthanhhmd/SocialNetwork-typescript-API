import { TYPEMESSAGE, STATUSMESSAGE } from './../constants/message.constant';
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

interface MessagesAttributes {

    id?: number,
    sourceId: number,
    targetId: number,
    content: string,
    link: string,
    type: string,
    status?: string,
    isDeletedA?:Boolean,
    isDeletedB?: Boolean,
}

interface MessagesCreationAttributes extends Optional<MessagesAttributes, "id"> { };



// I only accept user send text messages 
class Messages extends Model<MessagesCreationAttributes, MessagesAttributes>
    implements MessagesAttributes {
    public readonly id!: number;
    public readonly sourceId!: number;
    public readonly targetId!: number;
    public content!: string;
    public link!: string;
    public type!: string;
    public status!: string;
    public isDeletedA!: Boolean;
    public isDeletedB!: Boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Messages.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    sourceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,

    },
    targetId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        },
    },
    type: {
        type: DataTypes.STRING(10),
        defaultValue: TYPEMESSAGE.TEXT,
        validate: {
            isIn: [[TYPEMESSAGE.FILE, TYPEMESSAGE.TEXT, TYPEMESSAGE.IMAGE, TYPEMESSAGE.VIDEO]],
        }
    },
    status: {
        type: DataTypes.STRING(20),
        defaultValue: STATUSMESSAGE.WAITING,
        validate: {
            isIn : [[STATUSMESSAGE.WAITING, STATUSMESSAGE.SENT, STATUSMESSAGE.SEEN]],
        }
    },
    isDeletedA: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isDeletedB: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: "messages",
    paranoid: true,
    sequelize
});

export default Messages;


