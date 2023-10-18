const express = require("express");
const cors = require("cors");
const sql = require("./models/db");
const PORT =5000;
const restaurantRouter = require("./routes/restaurant.router")
const req = require("express/lib/request")
const db = require("./models/index")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const role = db.role

///dev mode
// db.sequelize.sync({force: true}).then(() =>{
//     console.log("Drop and resync DB");
//      initial();
// })



function initial() {
    role.create({
        id:1,
        name:"user",
    });
     role.create({
         id: 2,
         name: "moderrator",
     });
      role.create({
          id: 3,
          name: "admin",
      });
}


//creat service
const app = express();

//use middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// swaggerDocument 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req,res)=>{
    res.send("<h1>Restaurant</h1>");
})
app.use("/",restaurantRouter)
require("./routes/auth.router")(app);

app.listen(PORT, ()=>{
    console.log("Server is running on http://localhost:"+PORT)
})

