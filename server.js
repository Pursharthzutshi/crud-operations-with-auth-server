const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const port = 3001
const dotenv = require('dotenv').config()
console.log(process.env.dbUsername) // remove this after you've confirmed it is working




mongoose.connect(`mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.8ftcdmr.mongodb.net/crudOperations?retryWrites=true&w=majority`).then((res)=>{
    console.log(res)
})
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())

app.use(session({
    key:"logInUser",
    secret:"logInUserSecret",
    resave:true,
    saveUninitialized:false,
    cookie:{
        expiresIn:60
    }
  }))

  
const userRoute = require("./routes/user")

app.use("/createSignUpTable",userRoute)

app.use("/signup",userRoute)

app.use("/login",userRoute)


app.use("/createTable",userRoute)

app.use("/CreateData",userRoute)
app.use("/ReadData",userRoute)

app.use("/update",userRoute)
app.use("/update",userRoute)
app.use("/update",userRoute)

app.use("/DeteteData",userRoute)



app.listen(port,()=>{
    console.log(`${port} is running`)
})