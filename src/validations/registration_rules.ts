/**
 * Validation rules for User
 */
import { body } from 'express-validator'
import { getUserByEmail } from '../routes/user'

export const createRegistrationRules = [
	body('email').isEmail().custom(async value => {
		const user = await getUserByEmail(value)

		if (user) {
			return Promise.reject("Email already exists")
		}
	}),
	body('password').isString().bail().isLength({ min: 6}),
	body('first_name').isString().bail().isLength({ min: 3}),
	body('last_name').isString().bail().isLength({ min: 3}),
]