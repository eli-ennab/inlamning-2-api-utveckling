import { CreateUserData } from '../types'
import prisma from '../prisma'

/**
 * Create user
 */
export const createUser = async (data: CreateUserData) => {
	return await prisma.user.create({
		data: data,
	})
}

/**
 * Get user by email
 */
export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		}
	})
}