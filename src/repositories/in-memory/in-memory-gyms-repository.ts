import { randomUUID } from 'node:crypto'

import { Gym, Prisma } from '@prisma/client'

import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchMany(query: string, page: number) {
    const ITEMS_BY_PAGE = 20
    const START_USERS_ARRAY_DELIMETER = (page - 1) * ITEMS_BY_PAGE
    const END_USERS_ARRAY_DELIMETER = page * ITEMS_BY_PAGE

    return this.items
      .filter((item) =>
        item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
      .slice(START_USERS_ARRAY_DELIMETER, END_USERS_ARRAY_DELIMETER)
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(String(data.latitude)),
      longitude: new Prisma.Decimal(String(data.longitude)),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }
}
