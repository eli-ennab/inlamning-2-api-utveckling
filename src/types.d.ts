/**
 * Type definitions
 */

export type CreateUserData = {
	email: string,
	password: string,
    first_name: string,
    last_name: string,
}

export type CreateAlbumData = {
	title: string,
	user_id: number,
}

export type CreatePhotoData = {
	title: string,
	url: string,
	comment?: string,
	user_id: number,
}

export type JwtPayload = {
	sub: number,
    email: string,
	iat?: number,
	exp?: number,
}