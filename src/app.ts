import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { checkInsRoutes } from './controllers/check-ins/routes'
import { gymsRoutes } from './controllers/gyms/routes'
import { usersRoutes } from './controllers/users/routes'
import { env } from './env'
import { LateCheckInValidationError } from './services/errors/late-check-in-validation-error'
import { MaxDistanceError } from './services/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './services/errors/max-number-of-check-ins-error'
import { ResourceNotFoundError } from './services/errors/resource-not-found-error'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: {
		expiresIn: '10m',
	},
})

app.register(fastifyCookie)

app.register(fastifyCors, {
	origin: true,
	credentials: true,
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation error.', issues: error.format() })
	}

	if (error instanceof ResourceNotFoundError) {
		return reply.status(404).send({ message: 'Resource not found.' })
	}

	if (error instanceof MaxDistanceError) {
		return reply.status(404).send({ message: error.message })
	}

	if (error instanceof MaxNumberOfCheckInsError) {
		return reply.status(404).send({ message: error.message })
	}

	if (error instanceof LateCheckInValidationError) {
		return reply.status(404).send({ message: error.message })
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error)
	} else {
		// TODO: should implement an external tool to log productions errors. (Sentry, DataDog, New Relic)
	}

	return reply.status(500).send({ message: 'Internal server error.' })
})
