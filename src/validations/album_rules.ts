/**
 * Validation rules for User
 */
import { body } from 'express-validator'

export const createAlbumRules = [
	body('title').isString().withMessage('has to be a string').bail().isLength({ min: 3 }).withMessage('has to at least 3 chars long'),
]