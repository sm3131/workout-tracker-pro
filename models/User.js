const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

<<<<<<< HEAD
// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create fields/columns for User model
=======
//Create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  async checkPassword(loginPw) {
    const match = await bcrypt.compare(loginPw, this.password)
    if (match) {
      console.log(match);
      return match;
    } else {
      console.log(match);
      return;
    }
  }
}

//Create fields/columns for User model
>>>>>>> 5b92bab7bc3ee56d1ebda386d8cc8debdb96145b
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
<<<<<<< HEAD
  
=======
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
>>>>>>> 5b92bab7bc3ee56d1ebda386d8cc8debdb96145b
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;