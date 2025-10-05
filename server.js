const express = require("express")
const app = express()
require("dotenv").config()

// Database Configuration
require("./config/db")

//Port Configuration
const PORT = process.env.PORT ? process.env.PORT : "3000"

// Require/Use Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const methodOverride = require("method-override")
app.use(methodOverride("_method"))

const morgan = require("morgan")
app.use(morgan("dev"))

const isSignedIn = require("./Middlewares/isSignedIn.js")

const session = require("express-session")
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
  })
)

const path = require("path")
app.use(express.static(path.join(__dirname, "public")))

const passUser = require("./Middlewares/passUser")
app.use(passUser)

// Auth Router
const authRouter = require("./routes/auth")
app.use("/auth", authRouter)

// Salon Router
const salonRouter = require("./routes/salonsRouter")
app.use("/salon", salonRouter)

const serviceRouter = require("./routes/serviceRouter")
app.use("/service", serviceRouter)

// // User Router
// const userRouter = require("./routes/userRouter")
// app.use("/users", isSignedIn, userRouter)

app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.listen(PORT, () => {
  console.log(`Running Server on Port ${PORT} . . . `)
})
