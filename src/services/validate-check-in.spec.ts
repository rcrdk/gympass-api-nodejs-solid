import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ValidateCheckInService } from './validate-check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInService

describe('validate check-in service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInService(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.handle({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items.at(0)?.validated_at).toEqual(
      expect.any(Date),
    )
  })

  it('should nor be able to validate an non existing check-in', async () => {
    await expect(() => {
      return sut.handle({
        checkInId: 'non-existent-check-in',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 8, 4, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const advaceTimeIn21MinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(advaceTimeIn21MinutesInMs)

    await expect(() => {
      return sut.handle({
        checkInId: createdCheckIn.id,
      })
    }).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
