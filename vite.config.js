/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true, // Enables global `describe`, `it`, `expect`
    environment: 'jsdom', // Simulates browser
    setupFiles: './src/tests/setup.js', // Optional: see below
  },
})
