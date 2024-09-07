import { Gym, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
	async findById(id: string) {
		const gym = await prisma.gym.findUnique({
			where: { id },
		})

		return gym
	}

	async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
		const MAX_DISTANCE_IN_KILOMETERS = 10

		const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE (6371 * acos(cos(radians(${latitude})) * cos(radians(latitude) ) * cos(radians(longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(latitude)))) <= ${MAX_DISTANCE_IN_KILOMETERS}
    `

		return gyms
	}

	async searchMany(query: string, page: number) {
		const ITEMS_BY_PAGE = 20
		const SKIP_PREV_PAGES_ITEMS = (page - 1) * ITEMS_BY_PAGE

		const gyms = await prisma.gym.findMany({
			where: {
				title: {
					contains: query,
					mode: 'insensitive',
				},
			},
			take: ITEMS_BY_PAGE,
			skip: SKIP_PREV_PAGES_ITEMS,
		})

		return gyms
	}

	async create(data: Prisma.GymCreateInput) {
		const gym = await prisma.gym.create({
			data,
		})

		return gym
	}
}
