const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Logs extends Model { }

Logs.init()

module.exports = Logs;