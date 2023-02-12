import { createUserRules } from "../validations/user_rules"
import express from "express"
import { login, register } from "../controllers/user_controller"

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
 * POST /register
 * @param register Register a new user
 */
router.post('/register', createUserRules, register)

/**
 * POST /login
 */
router.post('/login', login)

export default router