import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from './App'

describe('App', () => {
  it('renders every recruitment stage', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '채용 파이프라인' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(5)
    expect(screen.getByRole('heading', { name: '서류 검토' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '불합격' })).toBeInTheDocument()
  })
})
