/**
 * Validation rules for User
 */
import { body } from 'express-validator'
import { getUserByEmail } from '../services/user_services'

export const createUserRules = [
	body('email').trim().isEmail().custom(async value => {
		const user = await getUserByEmail(value)

		if (user) {
			return Promise.reject("Email already exists")
		}
	}),
	body('password').trim().isString().bail().isLength({ min: 6}),
	body('first_name').trim().isString().bail().isLength({ min: 3}),
	body('last_name').trim().isString().bail().isLength({ min: 3}),
]