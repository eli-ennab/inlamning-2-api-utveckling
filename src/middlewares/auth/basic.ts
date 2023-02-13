/**
 * HTTP Basic Auth
 */
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from "express"
import { getUserByEmail } from "../../services/user_services"

export const basicAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
            return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	const [authSchema, base64Payload ] = req.headers.authorization.split(" ")

	if (authSchema.toLowerCase() !== "basic") {

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	const decodedPayload = Buffer.from(base64Payload, "base64").toString("ascii")

	const [email, password] = decodedPayload.split(":")

	const user = await getUserByEmail(email)
	if(!user) {

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	const result = await bcrypt.compare(password, user.password)

	if (!result) {
		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	req.user = user

    next()
}