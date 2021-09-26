import { Sequelize, Optional, Model, DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize";

import { initPasswordHash } from "../config/bcrypt";


const regexCheckNumber = /\d/;

interface UserAttributes {
  id?: number,
  username: string,
  password: string,
  isVerified?: Boolean,
  lastLogin?: Date | null,
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }


const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

class Users extends Model<UserCreationAttributes, UserAttributes>
  implements UserAttributes {
  public readonly id!: number;

  public username!: string;
  public password!: string;
  public isVerified!: Boolean;
  public lastLogin!: Date | null;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    set(password: string) {

      if (regexPassword.test(password)) {
        const hash = initPasswordHash(password);
        this.setDataValue('password', hash);

      } else {
        throw new Error("Password is not valid");
      }


    }
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
    set(value: string | Date) {
      if (typeof value === "string")
        this.setDataValue("lastLogin", new Date(value));
      else
        this.setDataValue("lastLogin", value);
    },
    validate: {
      isBefore: new Date().toLocaleDateString(),
    }
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "user",
  sequelize,

});

// (async function () {
//   await Users.sync({ force: true })
// })();

export default Users;