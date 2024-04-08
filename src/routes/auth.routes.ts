import { login, register } from "../controllers/auth.controller"
import express, { Router } from "express"
const router: Router = express.Router()

//REGISTER A USER
router.post("/register", register)

//LOGIN AN EXISTING USER
router.post("/login", login)


export default router