const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.database,
  config.user,
  '4h-}2HM0mjqA(qh.',
  {
    dialect: config.dialect,
    dialectOptions: {
      socketPath: `/cloudsql/analytics-349805:us-central1:financial-analytics`,
    },
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);

module.exports = db;