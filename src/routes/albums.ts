/**
 * Albums router
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, destroy } from '../controllers/_controller'
const router = express.Router()

/**
 * G
 */

/**
 * GET /albums
 * Get all albums
 */
router.get('/', index)

/**
 * GET /albums/:albumId
 * Get a single album
 */
router.get('/:albumId', show)

/**
 * POST /albums
 * Create a new album
 */
router.post('/', [], store)

/**
 * PATCH /albums/:albumId
 * Update an album
 */
router.patch('/:albumId', [], update)

/**
 * POST /albums/:albumId/photos
 * Add a photo to an album
 */
router.post('/:albumId/photos', [], store)

/**
 * VG
 */

/**
 * POST /albums/:albumId/photos
 * Add multiple photos to an album
 */
router.post('/:albumId/photos', [], store)

/**
 * DELETE /albums/:albumId/photos/:photoId
 * Remove a photo from an album
 */
router.delete('/:albumId/photos/:photoId', destroy)

/**
 * DELETE /albums/:albumId
 * Delete an album
 */
router.delete('/:albumId', destroy)

export default router