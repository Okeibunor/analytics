const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { successfulResponse, serverErrorResponse, badRequestResponse, notFoundResponse, unauthorizedResponse } = require("../helpers/responses");
const { password } = require("../config/db.config");

exports.signup =  async(req, res) => {
    try {
        const { email, password } = req.body

        const validationMessage =  []
        if (!email) {
            validationMessage.push(`email field is required`)
        }
        if (!password) {
            validationMessage.push(`password field is required`)
        }

        if (validationMessage.length > 0) {
            return badRequestResponse({
                response: res,
                message: validationMessage
            })
        }

        const userExists = await User.findOne({
            where: {
                email: email
            }
        })
    
        if (userExists) {
            return badRequestResponse({
                response: res,
                message: "user already exists"
            })
        }

        const user = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(password, 8)
        })

        if (!user) {
            return badRequestResponse({
                response: res,
                message: "could not create user",
            })
        }

        return successfulResponse({
            response: res,
            message: "user successfully created"
        })
    } catch (error) {
        console.log("signup error ==>", error)
        return badRequestResponse({
            response: res,
            message: "could not successfully create user"
        })
    }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body

    const validationMessage =  []
    if (!email) {
        validationMessage.push(`email field is required`)
    }
    if (!password) {
        validationMessage.push(`password field is required`)
    }
    
    if (validationMessage.length > 0) {
        return badRequestResponse({
            response: res,
            message: validationMessage
        })
    }

    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if (!user) {
        return notFoundResponse({
            response: res,
            message: "User not found"
        })
    }

    const passwordIsValid = bcrypt.compareSync(
        password,
        user.password
    );

    if (!passwordIsValid) {
        return unauthorizedResponse({
            response: res,
            message: "Invalid email and password combination",
            data: {
                accessToken: null
            }
        })
    }
    var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 3600
    });

    return successfulResponse({
        response: res,
        data: {
            id: user.id,
            email: user.email,
            accessToken: token
        },
        message: "successfully signin"
    })

    } catch (error) {
        console.log('sign in error ==>', error)
        return badRequestResponse({
            response: res,
            message: "could not signin"
        })
    }
};