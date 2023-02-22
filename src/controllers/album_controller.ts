import Debug from 'debug'
import prisma from '../prisma'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { createAlbum } from '../services/album_services'

const debug = Debug('albums:album_controller')

/**
 * Get all albums
 */
export const index = async (req: Request, res: Response) => {
	try {
		const albums = await prisma.album.findMany({
			where: {
				user_id: req.user.sub
			  }
		})
		res.status(200).send({
			status: "success",
			data: albums,
		})
	} catch (err) {
		res.status(500).send({ 
			status: "error", 
			message: "Something went wrong getting albums" 
		})
	}
}

/**
 * Get a single album
 */
export const show = async (req: Request, res: Response) => {

	const albumId = Number(req.params.albumId)

	try {
		const album = await prisma.album.findFirstOrThrow({
			where: {
			  id: albumId,
			  user_id: req.user.sub
			},
			include: {
				photos: true,
			}
		  })
		res.status(200).send({
			status: "success",
			data: {
				id: album.id,
				title: album.title,
				photos: album.photos
			},
		})
	} catch (err) {
		return res.status(404).send({ 
			status: "fail", 
			message: "You have no album with that ID" 
		})
	}
}

/**
 * Create an album
 */
export const store = async (req: Request, res: Response) => {
	
	const validatonErrors = validationResult(req)
	if(!validatonErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validatonErrors.array(),
		})
	}

	try {
		const album = await createAlbum({
			title: req.body.title,
			user_id: req.user.sub,
		})
		res.status(200).send({
			status: "success",
			data: album,
		})
	} catch (err) {
		res.status(500).send({ 
			status: "error", 
			message: "Something went wrong creating album" 
		})
	}
}

/**
 * Update an album
 */
export const update = async (req: Request, res: Response) => {

	const validatonErrors = validationResult(req)
	if(!validatonErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validatonErrors.array(),
		})
	}

	const albumId = Number(req.params.albumId)

	try {
		await prisma.album.findFirstOrThrow({
			where: {
				id: albumId,
				user_id: req.user.sub
			  }
		})
	} catch (err) {
		return res.status(401).send({ 
			status: "fail", 
			message: "You are not authorized" 
		})
	}

	try {
		const updateAlbum = await prisma.album.update({
			where: {
			id: albumId,
			},
			data: {
			title: req.body.title,
			}
		})
		res.status(200).send({
			status: "success",
			data: updateAlbum,
		})
	} catch (err) {
		res.status(500).send({ 
			status: "error", 
			message: "Something went wrong updating the album" 
		})
	}
}

/**
 * Add photos to album
 */
export const addPhotosToAlbum = async (req: Request, res: Response) => {

	const validatonErrors = validationResult(req)
	if(!validatonErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validatonErrors.array(),
		})
	}

	try {
		await prisma.album.findFirstOrThrow({
			where: {
				id: Number(req.params.albumId),
				user_id: req.user.sub
			  }
		})
	} catch (err) {
		return res.status(401).send({ 
			status: "fail", 
			message: "You are not authorized" 
		})
	}
	
	try {
		const photoIds = req.body.photo_id

		await prisma.album.update({
			where: {
				id: Number(req.params.albumId),
			},
			data: {
				photos: {
					connect: photoIds.map((id: Number) => ({ id })),
				},
			},
		})

		if (req.body.id !== req.user.sub)
			return res.status(401).send({ 
				status: "fail", 
				message: "You are not authorized" 
			})

		res.status(200).send({
			status: "success",
			data: null
		})
	} catch (err) {
		res.status(500).send({ 
			status: "error",
			message: "Something went wrong adding photo to album" 
		})
	}
}


/**
 * Remove photo from album
 */
export const removePhotoFromAlbum = async (req: Request, res: Response) => {

	const validatonErrors = validationResult(req)
	if(!validatonErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validatonErrors.array(),
		})
	}

	try {
		await prisma.album.findFirstOrThrow({
			where: {
				id: Number(req.params.albumId),
				user_id: req.user.sub
			  }
		})
	} catch (err) {
		return res.status(401).send({ 
			status: "fail", 
			message: "You are not authorized" 
		})
	}
	
	try {
		await prisma.album.update({
			where: {
				id: Number(req.params.albumId),
			},
			data: {
				photos: {
					disconnect: {
						id: Number(req.params.photoId),
					}
				}
			}
		})

		res.status(200).send({
			status: "success",
			data: null,
		})
	} catch (err) {
		res.status(500).send({ 
			status: "error",
			message: "Something went wrong removing photo from album" 
		})
	}
}

/**
 * Delete an album (and the links to the album's photos, but not the photos themselves)
 */
export const deleteAlbum = async (req: Request, res: Response) => {

	const validatonErrors = validationResult(req)
	if(!validatonErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validatonErrors.array(),
		})
	}

	try {
		await prisma.album.findFirstOrThrow({
			where: {
				id: Number(req.params.albumId),
				user_id: req.user.sub
			  }
		})
	} catch (err) {
		return res.status(401).send({ status: "fail", message: "You are not authorized" })
	}
	
	try {
		await prisma.album.delete({
			where: {
				id: Number(req.params.albumId),
			},
			include: {
				photos: true,
			},
		})

		res.status(200).send({
			status: "success",
			data: null
		  })
	} catch (err) {
		res.status(500).send({ 
			status: "error",
			message: "Something went wrong deleting album and the album's links" 
		})
	}
}