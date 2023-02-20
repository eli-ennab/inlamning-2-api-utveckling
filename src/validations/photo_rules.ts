/**
 * Validation rules for Photo
 */
import { body } from 'express-validator'

export const createPhotoRules = [
	body('title').trim().isString().withMessage('has to be a string').bail().isLength({ min: 3 }).withMessage('has to at least 3 chars long'),
    body('url').trim().isURL().withMessage('has to be an url'),
    body('comment').trim().optional().isString().withMessage('has to be a string').bail().isLength({ min: 3 }).withMessage('has to at least 3 chars long'),
]