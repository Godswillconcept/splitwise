'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Property.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Property.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    area: DataTypes.DECIMAL,
    type: DataTypes.STRING,
    location: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};