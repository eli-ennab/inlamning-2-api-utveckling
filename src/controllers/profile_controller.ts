/**
 * Profile Controller
 */
import { Request, Response } from 'express'
import prisma from '../prisma'

/**
 * Get the authenticated user's profile
 */
export const getProfile = async (req: Request, res: Response) => {
	res.send({
		status: "success",
		// data: {
		// 	sub: req.user.sub,
		// 	email: req.user.email
		// }
		data: req.user
	})
}