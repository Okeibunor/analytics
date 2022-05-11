module.exports = (sequelize, Sequelize) => {
    const attributes = {
        email: { type: Sequelize.STRING, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },
    };

    return sequelize.define('users', attributes);
}