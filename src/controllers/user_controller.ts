/**
 * User controller
 */
import bcrypt from 'bcrypt'
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createUser, getUserByEmail } from '../routes/user'
import { JwtPayload } from '../types'
import jwt from 'jsonwebtoken'

const debug = Debug('prisma-albums:user_controller')

/**
 * Login a user
 */
export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body

	const user = await getUserByEmail(email)
	if (!user) {
		return res.status(401).send({
			status: "fail",
			message: "Authorization required"
		})
	}

	const result = await bcrypt.compare(password, user.password)
	if (!result) {
		return res.status(401).send({
			status: "fail",
			message: "Authorization required"
		})
	}

	const payload: JwtPayload = {
		sub: user.id,
		email: user.email,
	}

    if (!process.env.ACCESS_TOKEN_SECRET) {
        return res.status(500).send({
            status: "error",
            message: "No access token secret defined",
        })
    }
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)

    res.send({
        status: "success",
        data: {
            access_token
        }
    })
}

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        })
    }

    const validatedData = matchedData(req)
    console.log("Validated data:", validatedData)

    const hashedPassword = 
        await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10)
		console.log("Hashed password:", hashedPassword)
    
    validatedData.password = hashedPassword

    try {   
		const user = await createUser({
			email: validatedData.email,
			password: validatedData.password,
            first_name: validatedData.first_name,
            last_name: validatedData.last_name,
		})

        res.status(201).send({ 
            status: "success", data: user
        })
    } catch (err) {
		return res.status(500).send({ 
            status: "error", message: "Could not create user" 
        })
    }
}