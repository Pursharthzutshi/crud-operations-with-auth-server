const router = require("express").Router()
const controller = require("../controllers/userController")


router.get("/createTable",controller.createTable)

router.get("/createSignUpTable",controller.signUpUsers)


//insert sign up details

router.post("/insertSignUpDetails",controller.signUpUsers)

//logged in user details

router.post("/logInUserDetails",controller.logInUsers)
router.get("/logInUserDetails",controller.loggedInUserCredentials)

//Crud Routes

router.post("/InsertUserDetails",controller.Create)

router.get("/ReadUserDetails",controller.Read)

router.put("/UpdateFirstName/:id",controller.UpdateFirstName)
router.put("/UpdateLastName/:id",controller.UpdateLastName)
router.put("/UpdateAge/:id",controller.UpdateAge)

router.delete("/DeteteUserData/:id",controller.Delete)


module.exports = router