/**
 * Photos router
 */
import express from 'express'
import { index, show, store, update, destroy} from '../controllers/photo_controller'
import { createPhotoRules, updatePhotoRules } from '../validations/photo_rules'
const router = express.Router()

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
router.patch('/:photoId', updatePhotoRules, update)

/**
 * DELETE /photos/:photoId
 * Delete a photo
 */
router.delete('/:photoId', destroy)

export default router
