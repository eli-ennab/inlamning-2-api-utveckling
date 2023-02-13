/**
 * User services
 */
import { CreateUserData } from '../types'
import prisma from '../prisma'

/**
 * Get a user by email (used for registration validation)
 */
export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		}
	})
}

/**
 * Create a user
 */
export const createUser = async (data: CreateUserData) => {
	return await prisma.user.create({
		data: data,
	})
}