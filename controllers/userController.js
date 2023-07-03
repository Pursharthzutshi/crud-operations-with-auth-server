const userInfo = require("../models/user").userInfoTable
const signUpDetails = require("../models/user").signUpDetailsTable


const jwt = require("jsonwebtoken")


// create Sign Up Table

async function createSignUpTable(req,res){
    await signUpDetails()
    res.send("sign up table created")
}


async function createTable(req,res){
    await userInfo()
    res.send("Table created")
}

//sign up details table

async function signUpUsers(req,res){
    const signUpEmailId = req.body.signUpEmailId
    const signUpUsername = req.body.signUpUsername
    const signUpPassword = req.body.signUpPassword

    
    const existingEmailId = await signUpDetails.find({emailId:signUpEmailId})

    if(existingEmailId.length > 0){
        res.json({errormessage:"Email Id already exisiting"});
    }else if(signUpEmailId === "" || signUpPassword === ""){
        res.json({errormessage:"Email Id and password not filled"});
   }else if(signUpUsername === ""){
        res.json({errormessage:"Username not filled"});
   }else{
    await signUpDetails.insertMany({emailId:signUpEmailId,username:signUpUsername,password:signUpPassword})
    res.json({message:"Signed Up Successfully"});
   
   }



}

// log In User details

async function loggedInUserCredentials(req,res){
    if(req.session.user){

        res.json({loggedIn:true,user:req.session.user})
    }else{
        res.json({loggedIn:false,message:"Not Logged In"})
    }

}


async function logInUsers(req,res){
    const loggedInEmailId = req.body.loggedInEmailId
    const loggedInPassword = req.body.loggedInPassword

    console.log(loggedInEmailId)
    console.log(loggedInPassword)

    const logInUserDetails = await signUpDetails.find({emailId:loggedInEmailId,password:loggedInPassword})
    

    if(logInUserDetails.length > 0){

        const logInUserDetailsId = logInUserDetails[0].id

        const accessToken = jwt.sign({id:logInUserDetailsId},"jwtsecretaccesstoken",{
            expiresIn:"20s"
        })
   
        const refreshToken = jwt.sign({id:logInUserDetailsId},"jwtsecretrefreshtoken",{
            expiresIn:"2d"
        })
    
        req.session.user = {logInUserDetails,accessToken,refreshToken}
        // console.log()

        res.json({result:logInUserDetails,auth:true});
    }else {
        res.json({auth:false});

    }

}

//create

async function Create(req,res){

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const age = req.body.age

    console.log(firstName)
    console.log(lastName)
    console.log(age)

    const data = await userInfo.insertMany({firstName:firstName,lastName:lastName,age:age})
    res.send(data)
}



//read

async function Read(req,res){

    const userData = await userInfo.find()
    res.send(userData)
}

//update

async function UpdateFirstName(req,res){

    const id = req.params.id
    
    const updatedFirstName = req.body.updatedFirstName

    console.log(id)
    console.log(updatedFirstName)
    await userInfo.updateOne({_id:id},{$set:{firstName:updatedFirstName}})
    res.send("Table created")
}


async function UpdateLastName(req,res){

    const id = req.params.id
    const updatedLastName = req.body.updatedLastName

    console.log(updatedLastName)
    await userInfo.updateOne({_id:id},{$set:{lastName:updatedLastName}})
    res.send("Table created")
}


async function UpdateAge(req,res){

    const id = req.params.id
    const updatedAge = req.body.updatedAge

    console.log(updatedAge)
    await userInfo.updateOne({_id:id},{$set:{age:updatedAge}})
    res.send("Table created")
}

//delete

async function Delete(req,res){
    
    const id = req.params.id

    await userInfo.deleteOne({_id:id})
    res.send("Table created")
}

module.exports ={
    createTable,
    Create,
    Read,
    UpdateFirstName,
    UpdateLastName,
    UpdateAge,
    Delete,
    createSignUpTable,
    signUpUsers,
    logInUsers,
    loggedInUserCredentials
} 