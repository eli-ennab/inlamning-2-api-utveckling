/**
 * Validation rules for Album
 */
import { body } from 'express-validator'

export const createAlbumRules = [
	body('title').trim().isString().withMessage('has to be a string').isLength({ min: 3 }).withMessage('has to at least 3 chars long'),
]

export const updateAlbumRules = [
	body('title').isString().withMessage('has to be a string').isLength({ min: 3 }).withMessage('has to at least 3 chars long'),
]

export const addPhotosToAlbumRules = [
	body('photo_id').notEmpty().withMessage('has to contain at least one int').isArray().withMessage('has to be an array'),
]

export const removePhotoFromAlbumRules = [

]