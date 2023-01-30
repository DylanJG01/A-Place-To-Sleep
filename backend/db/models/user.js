'use strict';
const bcrypt = require('bcryptjs');
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    toSafeObject(){
      const { id, username, email, firstName, lastName } = this;
      return { id, username, email, firstName, lastName}
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      User.hasMany(models.Spot, { foreignKey: 'ownerId', onDelete: 'CASCADE'})
      User.belongsToMany( models.Spot, {
        through: 'Booking',
        foreignKey: 'userId',
        otherKey: 'spotId'
      })
      
      User.belongsToMany( models.Spot, {
        through: 'Review',
        foreignKey: 'userId',
        otherKey: 'spotId'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        lengthWithinBounds(value){
          if (value.length < 4 || value.length > 30){
            throw new Error("Username must be between 4 and 30 characters")
          }
        },
        isNotEmail(value){
          if (Validator.isEmail(value)){
            throw new Error("Username cannot be an email")
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validLength(value){
          if(value.length < 1 || value.length > 35){
            throw new Error("First name must be between 1 and 35 characters")
          }
        }
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validLength(value) {
          if (value.length < 1 || value.length > 50) {
            throw new Error("Last name must be between 1 and 50 characters")

          }
        }
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword", 'createdAt', 'updatedAt'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};