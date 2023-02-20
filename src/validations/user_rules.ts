/**
 * Validation rules for User
 */
import { body } from 'express-validator'
import { getUserByEmail } from '../services/user_services'

export const createUserRules = [
	body('email')
		.trim()
		.isEmail().custom(async value => {
			const user = await getUserByEmail(value)

			if (user) {
				return Promise.reject("Email already exists")
			}
		}),
	body('password')
		.trim()
		.isString()
		.isLength({ min: 6}).withMessage('has to at least 6 chars long'),
	body('first_name')
		.trim()
		.isString()
		.isLength({ min: 3}).withMessage('has to at least 3 chars long'),
	body('last_name')
		.trim()
		.isString()
		.isLength({ min: 3}).withMessage('has to at least 3 chars long'),
]

export const createLoginRules = [
	body('email')
		.trim()
		.isEmail().custom(async value => {
			const user = await getUserByEmail(value)

			if (user) {
				return Promise.reject("Email already exists")
			}
		}),
	body('password')
		.trim()
		.isString()
		.isLength({ min: 6}).withMessage('has to at least 6 chars long'),
]