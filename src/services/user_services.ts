import { CreateUserData } from '../types'
import prisma from '../prisma'

export const createUser = async (data: CreateUserData) => {
	return await prisma.user.create({
		data: data,
	})
}

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		}
	})
}