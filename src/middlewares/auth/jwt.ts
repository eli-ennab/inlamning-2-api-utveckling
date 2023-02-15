/**
 * JWT Auth
 */
import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { JwtPayload } from "../../types"

/**
 * Validate (JWT Access) token
 */
export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
		return res.status(401).send({
			status: "fail",
			message: "Authorization required"
		})
	}

    const [authSchema, token] = req.headers.authorization.split(" ")

	if(authSchema.toLowerCase() !== "bearer") {
		return res.status(401).send({
			status: "fail",
			message: "Authorization required"
		})
	}

    try {
		const payload = (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "4h") as unknown) as JwtPayload

		req.user = payload

	} catch (err) {
		return res.status(401).send({
			status: "fail",
			message: "Authorization required"
		})
	}

    next()
}