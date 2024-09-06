import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchNeabyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
	const searchGymsQuerySchema = z.object({
		latitude: z.coerce.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.coerce.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
	})

	const { latitude, longitude } = searchGymsQuerySchema.parse(request.query)

	const fetchNearbyGymsService = makeFetchNeabyGymsService()

	const { gyms } = await fetchNearbyGymsService.handle({
		userLatitude: latitude,
		userLongitude: longitude,
	})

	return reply.status(201).send({ gyms })
}
