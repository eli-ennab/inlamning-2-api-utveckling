import prisma from '../prisma'
import { CreateAlbumData } from '../types'

/**
 * Create album
 */
export const createAlbum = async (data: CreateAlbumData) => {
	return await prisma.album.create({
		data
	})
}
