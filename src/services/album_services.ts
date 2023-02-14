import prisma from '../prisma'
import { CreateAlbumData } from '../types'

export const createAlbum = async (data: CreateAlbumData) => {
	return await prisma.album.create({
		data
	})
}