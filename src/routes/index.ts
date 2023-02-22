import albums from './albums'
import express from "express"
import photos from './photos'
import profile from "./profile"
import { login, refresh, register } from "../controllers/user_controller"
import { createLoginRules, createUserRules } from "../validations/user_rules"
import { jwtAuth } from "../middlewares/auth/jwt"

const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "WELCOME",
	})
})

/**
 * /albums
 */
router.use('/albums', jwtAuth, albums)

/**
 * /photos
 */
router.use('/photos', jwtAuth, photos)

/**
 * GET /profile
 * @param profile Get the authenticated user's profile
 */
router.use('/profile', jwtAuth, profile)

/**
 * POST /register
 * @param register Register a new user
 */
router.post('/register', createUserRules, register)

/**
 * POST /login
 * @param login Login user
 */
router.post('/login', createLoginRules, login)

/**
 * POST /refresh
 */
router.post('/refresh', refresh)

export default router