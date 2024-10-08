import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('create check-in (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create a check-in', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const { id: gymId } = await prisma.gym.create({
			data: {
				title: 'Javascript Gym',
				description: 'Some description',
				phone: '(44) 4323-4542',
				latitude: -26.8098821,
				longitude: -49.2705003,
			},
		})

		const response = await request(app.server)
			.post(`/gyms/${gymId}/check-ins`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: -26.8098821,
				longitude: -49.2705003,
			})

		expect(response.statusCode).toEqual(201)
	})
})
