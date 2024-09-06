import { Environment } from 'vitest'

export default <Environment>{
	name: 'prisma',
	transformMode: 'ssr',
	setup() {
		console.log('setup')

		return {
			async teardown() {
				console.log('teardown')
			},
		}
	},
}
