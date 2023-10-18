const config = require("../config/db.config")

const Sequelize = require(`sequelize`);
const sequelize = new Sequelize(config.DB, config.USER ,config.PASSWORD, {
    host:config.HOST,
    dialect:config.dialect,
    dialectOptions:{
        ssl:{
            required:true,
            rejectUnauthorized:false
        }
    },
    pool:{
        max:config.pool.max,
        min:config.pool.min,
        acquire:config.pool.acquire,
        idle:config.pool.idle
    }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize,Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);

db.refreshToken = require("./refreshToken.model")(sequelize, Sequelize);

///one to many
db.role.belongsToMany(db.user,{
    through:"users_roles"
})

///one to many
db.user.belongsToMany(db.role, {
    through: "users_roles"
});

///one to one
db.refreshToken.belongsTo(db.user,{
    foreigKey: "userId",
    targetKey:"id",
})
db.user.hasOne(db.refreshToken,{
    foreigKey: "userId",
    targetKey:"id",
})

db.ROLES = ["user", "admin", "=moderater"]

module.exports = db;
