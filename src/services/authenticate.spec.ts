import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('authenticate service', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateService(usersRepository)
	})

	it('should be able to authenticate', async () => {
		await usersRepository.create({
			name: 'John Doe',
			email: 'john@doe.com',
			password_hash: await hash('123456', 6),
		})

		const { user } = await sut.handle({
			email: 'john@doe.com',
			password: '123456',
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should not be able to authenticate with wrong e-mail', async () => {
		await expect(() => {
			return sut.handle({
				email: 'john@doe.com',
				password: '123456',
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		await usersRepository.create({
			name: 'John Doe',
			email: 'john@doe.com',
			password_hash: await hash('123456', 6),
		})

		await expect(() => {
			return sut.handle({
				email: 'john@doe.com',
				password: '78910',
			})
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
