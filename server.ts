import app from './src/app'
import http from 'http'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(PORT)

server.on('error', (err: NodeJS.ErrnoException) => {
	if (err.syscall !== 'listen') {
		throw err;
	}

	switch (err.code) {
		case 'EACCES':
			console.error(`Port ${PORT} requires elevated privileges`)
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(`Port ${PORT} is already in use`)
			process.exit(1)
			break
		default:
			throw err
	}
})

server.on('listening', () => {
	console.log(`Server started on http://localhost:${PORT}`)
})
