
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("urols", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true
        },
        name: {
            type: Sequelize.STRING,
        },
    });
    return Role;
};