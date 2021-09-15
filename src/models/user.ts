import { Sequelize, Optional, Model, DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize";

import { initPasswordHash } from "../config/bcrypt";


const regexCheckNumber = /\d/;

interface UserAttributes {
  id?: number,
  username: string,
  password: string,
  isVerified?: Boolean,
  //lastLogin?: Date | null,
  //birthDay: Date,
  //contactId?: string | null,
  //avt?: string | null,
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }



class Users extends Model<UserCreationAttributes, UserAttributes>
  implements UserAttributes {
  public readonly id!: number;

  public username!: string;
  public password!: string;
  public isVerified!: Boolean;



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
      customValiate(username: string) {

        if (username.length > 30)
          return { msg: "username must be less than 30 character." }

        if (!regexCheckNumber.test(username))
          return {
            msg: "username must have at least one number.",
          }

      }
    }
  },
  password: {
    type: DataTypes.STRING,
    set(password: string) {
      const hash = initPasswordHash(password);
      this.setDataValue('password', hash);
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