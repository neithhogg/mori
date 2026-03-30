import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// RTL does not auto-cleanup in Vitest without globals enabled.
// Explicit afterEach ensures the DOM is reset between every test.
afterEach(() => {
  cleanup()
})
