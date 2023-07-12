const exports = require("express");
const cors = require("cors");
const sql = require("./models/db");
const PORT =5000;

//creat service
const app = exports();



//use middleware
app.use(cors());
app.use(express.json());
app.use(express.urleamcoded({extended:false}));

app.get("/", (req,res)=>{
    res.send(<h1> Hello</h1>);
})

app.listen(PORT, ()=>{
    console.log("Server is running on http://localhost:"+PORT)
})