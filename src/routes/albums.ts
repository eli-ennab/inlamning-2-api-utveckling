/**
 * Albums router
 */
import express from 'express'
import { body } from 'express-validator'
import { Request, Response } from 'express'
import prisma from '../prisma'
import { index, show, store, update, deleteAlbum, addPhotosToAlbum, removePhotoFromAlbum } from '../controllers/album_controller'
const router = express.Router()
import Debug from 'debug'
import { createAlbumRules, updateAlbumRules } from '../validations/album_rules'

const debug = Debug('albums:albums')

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
router.post('/', createAlbumRules, store)

/**
 * PATCH /albums/:albumId
 * Update an album
 */
router.patch('/:albumId', createAlbumRules, update)

/**
 * VG
 */

/**
 * POST /albums/:albumId/photos
 * Add multiple photos to an album
 */
router.post('/:albumId/photos', [], addPhotosToAlbum)

/**
 * DELETE /albums/:albumId/photos/:photoId
 * Remove a photo from an album
 */
router.delete('/:albumId/photos/:photoId', removePhotoFromAlbum)

/**
 * DELETE /albums/:albumId
 * Delete an album
 */
router.delete('/:albumId', deleteAlbum)

export default router