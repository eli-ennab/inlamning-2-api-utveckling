import { createUserRules } from "../validations/user_rules"
import express from "express"
import { login, register } from "../controllers/user_controller"
import profile from "./profile"
import { basicAuth } from "../middlewares/auth/basic"

const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "WELCOME",
	})
})

/**
 * GET /profile
 * @param profile Get the authenticated user's profile
 */
router.use('/profile', basicAuth, profile)

/**
 * POST /register
 * @param register Register a new user
 */
router.post('/register', createUserRules, register)

/**
 * POST /login
 * @param login Login user
 */
router.post('/login', login)

export default router