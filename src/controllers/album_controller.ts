/**
 * Albums controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'
import { createAlbum, updateAlbum } from '../services/album_services'

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
		res.send({
			status: "success",
			data: albums,
		})
	} catch (err) {
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Get a single album
 */
export const show = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId)
	try {
		const album = await prisma.album.findFirst({
			where: {
			  id: albumId,
			  user_id: req.user.sub
			}
		  })
		res.send({
			status: "success",
			data: album,
		})
	} catch (err) {
		return res.status(404).send({ status: "error", message: "Not found" })
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
		res.send({
			status: "success",
			data: album,
		})
	} catch (err) {
		debug("All I got was this lousy: %o", err)
		res.status(500).send({ status: "error", message: "Cannot create album" })
	}
}

/**
 * Update an album
 */
export const update = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId)

	debug("All I sent was this lousy: %o", albumId)

	try {
	const updateAlbum = await prisma.album.update({
		where: {
		  id: albumId,
		},
		data: {
		  title: req.body.title,
		},
	  })
	  res.send({
		status: "success",
		data: updateAlbum,
	})
	} catch (err) {
		debug("All I got was this lousy: %o", err)
		res.status(500).send({ status: "error", message: "Cannot update album" })
	}
}