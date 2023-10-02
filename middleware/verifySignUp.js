const db = require("../models/")
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUserOrEmail = (req, res, next) => {
    //checkUser
    ///SELECT * FROM user WHERE username = req.body.username
    User.findOne({
        where: {
            username: req.body.username,
        }
    }).then(user => {
        if (user) {
            res.status(400).send({ message: "Failed Username is already in Uuer!" })
            return;
        }

         //checkemail
        ///SELECT * FROM email  WHERE email = req.body.email
        User.findOne({
            where: {
                email: req.body.email,
            }
        }).then(user => {
            if (user) {
                res.status(400).send({ message: "Failed email is already in email" })
            }
            next();
        })
      
    })
}

checkRolesExisted = (req, res, next) =>{
    if(req.body.roles){
        for(let i=0 ; i < req.body.roles.length; i++){
        if(!ROLES.includes(req.body.roles[i])){
            res.status(400).send({
                message: "Failed Roles dose not exist = " + req.body.roles[i],
            })
        }
    }
}
next();
};

const verifySignUp ={
    checkDuplicateUserOrEmail : checkDuplicateUserOrEmail,
    checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;

