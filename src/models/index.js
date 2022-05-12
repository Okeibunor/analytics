const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    dialect: config.dialect,
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    },
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);

module.exports = db;