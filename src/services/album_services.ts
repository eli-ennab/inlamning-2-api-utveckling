import prisma from '../prisma'
import { CreateAlbumData, updateAlbumData } from '../types'

export const createAlbum = async (data: CreateAlbumData) => {
	return await prisma.album.create({
		data
	})
}

export const updateAlbum = async (data: updateAlbumData) => {

}
