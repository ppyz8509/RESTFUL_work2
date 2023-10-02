const jwt = require("jsonwebtoken")
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;


verifyToken = (req,res,next) =>{
    let token = req.header['x-access-token'];
    if(!token){
        return res.status(403).send({message: "no token provided!"})
    }
    jwt.verify(token, config.secret, (err, decoded)=>{
      if(err){
        return res.status(401).send({
            Message:"Unauthorized",
        })
      }
      req.userId = decoded.id;
      next();
    })
}
isAdmin = (req, res ,next) =>{
    ///SELECT * FROM user WHERE id = req.buserId
    User.findByPk(req.userId).then( user =>{
        ///SELECT * FROM roles,user , user_roles WHERE user.id = user_userId and role.id = user_roles.roleId 
        user.getRoles().then(roles =>{
            for(let i=0; i< roles.length; i++){
                if(roles[i].name === "admin"){
                    next()
                    return                
                }
            }
            res.status(403).send({ message :"Require Admin Role!"})
            return;
        })
    })
}
isModerator = (req, res ,next) =>{
    ///SELECT * FROM user WHERE id = req.buserId
    User.findByPk(req.userId).then( user =>{
        ///SELECT * FROM roles,user , user_roles WHERE user.id = user_userId and role.id = user_roles.roleId 
        user.getRoles().then(roles =>{
            for(let i=0; i< roles.length; i++){
                if(roles[i].name === "moderator"){
                    next()
                    return                
                }
            }
            res.status(403).send({ message :"Require Moderator Role!"})
            return;
        })
    })
}

isModeratorOrAdmin = (req, res ,next) =>{
    ///SELECT * FROM user WHERE id = req.buserId
    User.findByPk(req.userId).then( user =>{
        ///SELECT * FROM roles,user , user_roles WHERE user.id = user_userId and role.id = user_roles.roleId 
        user.getRoles().then(roles =>{
            for(let i=0; i< roles.length; i++){
                if(roles[i].name === "moderator"){
                    next()
                    return                
                }
                if(roles[i].name === "admin"){
                    next()
                    return                
                }
            }
            res.status(403).send({ message :"Require Moderator Role!"})
            return;
        })
    })
}

const auth = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModeratorOrAdmin : isModeratorOrAdmin
}