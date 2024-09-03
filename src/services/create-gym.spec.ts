import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('create gym service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.handle({
      title: 'John Doe Gym',
      latitude: -26.8098821,
      longitude: -49.2705003,
      description: null,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
