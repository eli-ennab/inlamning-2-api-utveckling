/**
 * Validation rules for Album
 */
import { body } from 'express-validator'

export const createAlbumRules = [
	body('title')
		.trim()
		.isString().withMessage('has to be a string')
		.isLength({ min: 3 }).withMessage('has to at least 3 chars long'),
]

export const updateAlbumRules = [
	body('title')
		.isString().withMessage('has to be a string')
		.isLength({ min: 3 }).withMessage('has to at least 3 chars long'),
]

export const addPhotosToAlbumRules = [
	body('photo_id')
		.isArray({ min: 1 })
		.withMessage('has to be an array'),
	body('photo_id.*')
		.isInt()
]