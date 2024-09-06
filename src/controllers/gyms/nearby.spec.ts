import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('nearby gyms (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to list nearby gyms', async () => {
		const { token } = await createAndAuthenticateUser(app)

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'JavaScript Gym',
				description: 'Some description',
				phone: '(44) 4323-4542',
				latitude: -26.8098821,
				longitude: -49.2705003,
			})

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'TypeScript Gym',
				description: 'Some description',
				phone: '(44) 4323-4542',
				latitude: -26.7388758,
				longitude: -49.7199455,
			})

		const response = await request(app.server)
			.get('/gyms/nearby')
			.query({
				latitude: -26.8098821,
				longitude: -49.2705003,
			})
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(201)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: 'JavaScript Gym',
			}),
		])
	})
})
