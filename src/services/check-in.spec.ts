import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CheckinService } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinService

describe('check-in service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinService(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Academia T2',
      description: '',
      phone: '',
      latitude: new Decimal(-26.8098821),
      longitude: new Decimal(-49.2705003),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -26.8098821,
      userLongitude: -49.2705003,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -26.8098821,
      userLongitude: -49.2705003,
    })

    await expect(() => {
      return sut.handle({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -26.8098821,
        userLongitude: -49.2705003,
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -26.8098821,
      userLongitude: -49.2705003,
    })

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.handle({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -26.8098821,
      userLongitude: -49.2705003,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on a distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Academia Cultural',
      description: '',
      phone: '',
      latitude: new Decimal(-26.8214187),
      longitude: new Decimal(-49.2754213),
    })

    await expect(() => {
      return sut.handle({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -26.8098821,
        userLongitude: -49.2705003,
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
