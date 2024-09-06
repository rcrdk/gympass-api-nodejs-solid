import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('validate check-in (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to validate a check-in', async () => {
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

		let checkIn = await prisma.checkIn.create({
			data: {
				gym_id: gymId,
				user_id: userId,
			},
		})

		const response = await request(app.server)
			.patch(`/check-ins/${checkIn.id}/validate`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(204)

		checkIn = await prisma.checkIn.findUniqueOrThrow({
			where: {
				id: checkIn.id,
			},
		})

		expect(checkIn.validated_at).toEqual(expect.any(Date))
	})
})
