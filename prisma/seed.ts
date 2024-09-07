import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
	// create users
	await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'admin@admin.com',
			password_hash: await hash('123456', 6),
			role: 'ADMIN',
		},
	})

	const { id: memberId } = await prisma.user.create({
		data: {
			name: 'Janet Jackson',
			email: 'member@member.com',
			password_hash: await hash('123456', 6),
			role: 'MEMBER',
		},
	})

	// create gyms
	const { id: gymOneId } = await prisma.gym.create({
		data: {
			title: 'TypeScript Gym',
			description: 'Lorem ipsum dolor sit amet',
			phone: '(99) 9999-9999',
			latitude: -26.8098821,
			longitude: -49.2705003,
		},
	})

	const { id: gymTwoId } = await prisma.gym.create({
		data: {
			title: 'JavaScript Gym',
			description: 'Lorem ipsum dolor sit amet',
			phone: '(99) 9999-9999',
			latitude: -26.9492436,
			longitude: -48.6316608,
		},
	})

	// create check-ins
	await prisma.checkIn.createMany({
		data: [
			{
				gym_id: gymOneId,
				user_id: memberId,
				created_at: new Date(2024, 0, 1, 18, 0, 0),
			},
			{
				gym_id: gymTwoId,
				user_id: memberId,
				created_at: new Date(2024, 0, 2, 18, 0, 0),
			},
			{
				gym_id: gymTwoId,
				user_id: memberId,
				created_at: new Date(2024, 0, 3, 18, 0, 0),
			},
		],
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
