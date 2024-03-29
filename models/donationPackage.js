'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonationPackage extends Model {
    static associate(models) {
      DonationPackage.belongsTo(models.Inovation, {
        foreignKey: 'inovation_id',
        as: 'package',
      });
      DonationPackage.hasMany(models.Support, {
        foreignKey: 'package_id',
        as: 'packageDonate',
      });
    }
  }
  DonationPackage.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    inovation_id: DataTypes.INTEGER,
    package_name: DataTypes.STRING,
    nominal: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    souvenir: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DonationPackage',
  });
  return DonationPackage;
};