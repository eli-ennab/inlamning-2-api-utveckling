/**
 * User
 */
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