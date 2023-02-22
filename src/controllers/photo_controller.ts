import Debug from 'debug'
import prisma from '../prisma'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { createPhoto } from '../services/photo_services'

const debug = Debug('albums:photo_controller')

/**
 * Get all photos
 */
export const index = async (req: Request, res: Response) => {
	try {
		const photos = await prisma.photo.findMany({
			where: {
				user_id: req.user.sub
			  }
		})
		res.status(200).send({
			status: "success",
			data: photos,
		})
	} catch (err) {
		res.status(500).send({ 
			status: "error", 
			message: "Something went wrong getting photos" 
		})
	}
}

/**
 * Get a single photo
 */
export const show = async (req: Request, res: Response) => {

	const photoId = Number(req.params.photoId)
	
	try {
		const photo = await prisma.photo.findFirstOrThrow({
			where: {
			  id: photoId,
			  user_id: req.user.sub
			}
		  })
		res.status(200).send({
			status: "success",
			data: photo,
		})
	} catch (err) {
		return res.status(404).send({ 
			status: "fail", 
			message: `You have no photo with id ${photoId}`
		})
	}
}

/**
 * Create an photo
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
		const photo = await createPhoto({
			title: req.body.title,
			url: req.body.url,
			comment: req.body?.comment,
			user_id: req.user.sub,
		})
		res.status(200).send({
			status: "success",
			data: photo,
		})
	} catch (err) {
		res.status(500).send({ 
			status: "error", 
			message: "Something went wrong creating photo" 
		})
	}
}

/**
 * Update a photo
 */
export const update = async (req: Request, res: Response) => {

	const validatonErrors = validationResult(req)
	if(!validatonErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validatonErrors.array(),
		})
	}

	const photoId = Number(req.params.photoId)

	try {
		await prisma.photo.findFirstOrThrow({
			where: {
				id: photoId,
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
		const updatePhoto = await prisma.photo.update({
			where: {
				id: photoId,
			},
			data: {
				title: req.body.title,
				url: req.body.url,
				comment: req.body?.comment,
			}
		})
		res.status(200).send({
			status: "success",
			data: updatePhoto,
		})
	} catch (err) {
		res.status(500).send({ 
			status: "error", 
			message: "Something went wrong updating photo" 
		})
	}
}

/**
 * Delete a photo
 */
export const destroy = async (req: Request, res: Response) => {

	try {
		await prisma.photo.findFirstOrThrow({
			where: {
				id: Number(req.params.photoId),
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
		await prisma.photo.delete({
			where: {
				id: Number(req.params.photoId),
			}
		})

		res.status(200).send({
			status: "success",
			data: null
		})
	} catch (err) {
		res.status(500).send({ 
			status: "error", 
			message: "Something went wrong deleting photo and the photo's links" 
		});
	}
}