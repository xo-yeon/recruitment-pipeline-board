import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from './App'

describe('App', () => {
  it('renders the application heading', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '채용 파이프라인 보드' })).toBeInTheDocument()
  })
})
