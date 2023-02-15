import prisma from '../prisma'
import { CreatePhotoData } from '../types'

export const createPhoto = async (data: CreatePhotoData) => {
	return await prisma.photo.create({
		data
	})
}