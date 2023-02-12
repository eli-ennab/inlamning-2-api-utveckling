import { createRegistrationRules } from "../validations/registration_rules"
import express from "express"
import { register } from "../controllers/register_controller"

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
router.post('/register', createRegistrationRules, register)

export default router
