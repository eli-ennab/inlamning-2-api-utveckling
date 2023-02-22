import { Request, Response } from 'express'

/**
 * Get the authenticated user's profile
 */
export const getProfile = async (req: Request, res: Response) => {
	res.send({
		status: "success",
		data: req.user
	})
}