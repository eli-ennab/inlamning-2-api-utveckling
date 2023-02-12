/**
 * Register controller
 */
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createUser, getUserByEmail } from '../routes/user'
// import { JwtPayload } from '../types'

/**
 * Login a user
 */
export const login = async (req: Request, res: Response) => {

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