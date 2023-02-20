/**
 * Photos router
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update} from '../controllers/photo_controller'
import { createPhotoRules } from '../validations/photo_rules'
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
router.post('/', createPhotoRules, store)

/**
 * PATCH /photos/:photoId
 * Update a photo
 */
router.patch('/:photoId', [], update)

/**
 * VG
 */

/**
 * DELETE /photos/:photoId
 * Delete a photo
 */
// router.delete('/:photoId', destroy)

export default router
