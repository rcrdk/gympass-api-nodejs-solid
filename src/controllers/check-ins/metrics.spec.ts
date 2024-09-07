import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('check-ins metricts (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to list the history of check-ins', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const { id: userId } = await prisma.user.findFirstOrThrow()

		const { id: gymId } = await prisma.gym.create({
			data: {
				title: 'Javascript Gym',
				description: 'Some description',
				phone: '(44) 4323-4542',
				latitude: -26.8098821,
				longitude: -49.2705003,
			},
		})

		await prisma.checkIn.createMany({
			data: [
				{
					gym_id: gymId,
					user_id: userId,
				},
				{
					gym_id: gymId,
					user_id: userId,
				},
			],
		})

		const response = await request(app.server)
			.get('/check-ins/metrics')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(201)
		expect(response.body.checkInsCount).toEqual(2)
	})
})
