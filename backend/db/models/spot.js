'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId', onDelete: 'CASCADE'})
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'})
      Spot.belongsToMany(models.User, {
        through: 'Booking',
        foreignKey: 'spotId',
        otherKey: 'userId'
      })
      Spot.belongsToMany(models.User, {
        through: 'Review',
        foreignKey: 'spotId',
        otherKey: 'userId'
      })
    }
  }
  Spot.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validLen(value){
          if (value < 1 || value > 50){
            const err = new Error()
            err.message = "Country must be between 1 and 50 characters"
            err.status = 400
            throw err;
          }
        }
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        validLat(value){
          if(value < -90 || value > 90){
            const err = new Error()
            err.message = "Lng must be between -90 and 90 degrees"
            err.status = 400
            throw err;
          }
        },
        isNumeric: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        validLng(value) {
          if (value < -180 || value > 180) {
            const err = new Error()
            err.message = "Lng must be between -180 and 180 degrees"
            err.status = 400
            throw err;
          }
        },
        isNumeric: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validLength(value){
          if (value.length < 1 || value.length > 49){
            throw new Error("Name must be more than 0 and less than 50 characters")
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validLength(value){
          if(value.length > 256){
            throw new Error("Description must be between 1 and 255 characters")
          }
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true,
        validPrice(value){
          if(value < 1){
            throw new Error("Price per day is required and must be more than 0")
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
    modelName: 'Spot'
  });
  return Spot;
};