import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src/lib/']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/lib/index.ts'),
      name: 'PriorityQueue',
      fileName: 'priority-queue'
    }
  }
})