const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { unauthorizedResponse } = require("../helpers/responses.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return unauthorizedResponse({
      response: res,
      message: "unauthorized request"
    })
  }
  token = token.replace('Bearer ', '')

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return unauthorizedResponse({
        response: res,
        message: "unauthorized request"
      })
    }

    req.userId = decoded.id;

    const user = User.findByPk(req.userId)

    if (!user) {
      return unauthorizedResponse({
        response: res,
        message: "Unauthorized request"
      })
    }
    req.user = user;
    next()
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;