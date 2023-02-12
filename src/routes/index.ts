import { body } from 'express-validator'
import express from "express"
import { register } from "../controllers/register_controller"

// instantiate a new router
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
router.post('/register', [
	body('email').isEmail(),
	body('password').isString().bail().isLength({ min: 6}),
	body('first_name').isString().bail().isLength({ min: 3}),
	body('last_name').isString().bail().isLength({ min: 3}),
], register)

export default router
