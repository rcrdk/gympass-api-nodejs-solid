import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { FetchNearbyGyms } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGyms

describe('fetch nearby gyms service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGyms(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near By Gym',
      description: null,
      phone: null,
      latitude: -26.8098821,
      longitude: -49.2705003,
    })

    await gymsRepository.create({
      title: 'Far Far Away Gym',
      description: null,
      phone: null,
      latitude: -27.2152171,
      longitude: -49.6437048,
    })

    const { gyms } = await sut.handle({
      userLatitude: -26.8065864,
      userLongitude: -49.2690701,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near By Gym' })])
  })
})
