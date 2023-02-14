/**
 * Albums controller
 */
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import prisma from '../prisma'
import { createAlbum } from '../services/album_services'

/**
 * Get all albums
 */
export const index = async (req: Request, res: Response) => {
	try {
		const albums = await prisma.album.findMany()
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
		const album = await prisma.album.findUniqueOrThrow({
			where: {
				id: albumId,
			},
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

	const validatedData = matchedData(req)

	try {
		const album = await createAlbum({
			title: validatedData.title,
			user_id: req.user.sub,
			// id: req.body.id,
		})
		res.send({
			status: "success",
			data: album,
		})
	} catch (err) {
		res.status(500).send({ status: "error", message: "Cannot create album" })
	}
}