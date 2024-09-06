import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
	const getUserMetricsService = makeGetUserMetricsService()

	const { checkInsCount } = await getUserMetricsService.handle({
		userId: request.user.sub,
	})

	return reply.status(201).send({ checkInsCount })
}
