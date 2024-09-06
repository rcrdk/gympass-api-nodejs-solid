import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		environmentMatchGlobs: [
			['src/controllers/**', './vitest-enviroment/prisma.ts'],
		],
		dir: 'src',
	},
})
