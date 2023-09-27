const express = require("express");
const cors = require("cors");
const sql = require("./models/db");
const PORT =5000;
const restaurantRouter = require("./routes/restaurant.router")
const req = require("express/lib/request")
const db = require("./models/index")
const role = db.role





///dev mode
db.sequelize.sync({force: true}).then(() =>{
    console.log("Drop and resync DB");
    initial();
})

function initial() {
    role.create9({
        id:1,
        name:"user",
    });
     role.create9({
         id: 2,
         name: "moderrator",
     });
      role.create9({
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

app.get("/", (req,res)=>{
    res.send("<h1>Restaurant</h1>");
})
app.use("/",restaurantRouter)

app.listen(PORT, ()=>{
    console.log("Server is running on http://localhost:"+PORT)
})

