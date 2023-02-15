/**
 * Photos router
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store } from '../controllers/photo_controller'
const router = express.Router()

/**
 * G
 */

/**
 * GET /photos
 * Get all photos
 */
router.get('/', index)

/**
 * GET /photos/:photoId
 * Get a single photo
 */
router.get('/:photoId', show)

/**
 * POST /photos
 * Create a new photo
 */
router.post('/', [
	body('title').isString().withMessage('has to be a string').bail().isLength({ min: 3 }).withMessage('has to at least 3 chars long'),
    body('url').isString().withMessage('has to be a string'),
    body('comment').optional().isString().withMessage('has to be a string').bail().isLength({ min: 3 }).withMessage('has to at least 3 chars long'),
], store)

/**
 * PATCH /photos/:photoId
 * Update a photo
 */
// router.patch('/:photoId', [], update)

/**
 * VG
 */

/**
 * DELETE /photos/:photoId
 * Delete a photo
 */
// router.delete('/:photoId', destroy)

export default router
