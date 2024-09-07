import { Role } from '@prisma/client'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(
	app: FastifyInstance,
	role: Role = 'MEMBER',
) {
	await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'john@doe.com',
			password_hash: await hash('123456', 6),
			role,
		},
	})

	const authResponse = await request(app.server).post('/sessions').send({
		email: 'john@doe.com',
		password: '123456',
	})

	const { token } = authResponse.body

	return { token }
}
