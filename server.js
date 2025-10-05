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

// const isSignedIn = require("./Middlewares/isSignedIn")

const session = require("express-session")
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
  })
)

// const passUser = require("./Middlewares/pass-user")
// app.use(passUser)

// Auth Router
// const authRouter = require("./routes/authRouter")
// app.use("/auth", authRouter)

// // User Router
// const userRouter = require("./routes/userRouter")
// app.use("/users", isSignedIn, userRouter)


const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

const appointmentRouter = require('./routes/appointments')
app.use('/appointments', appointmentRouter)

app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.listen(PORT, () => {
  console.log(`Running Server on Port ${PORT} . . . `)
})

