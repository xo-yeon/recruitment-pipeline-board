import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { getApplicants, updateApplicantStage } from './api/applicants'
import { QueryProvider } from './app/QueryProvider'
import { App } from './App'
import type { Applicant } from './types/applicant'

vi.mock('./api/applicants', () => ({
  getApplicants: vi.fn(),
  updateApplicantStage: vi.fn(),
}))

const applicants: Applicant[] = [
  {
    id: 'applicant-001',
    name: '김서준',
    position: '프론트엔드 개발자',
    email: 'applicant1@example.com',
    phone: '010-1000-2000',
    appliedAt: '2026-07-31',
    stage: 'document',
    experienceYears: 3,
    summary: '사용자 경험 개선을 중요하게 생각합니다.',
  },
  {
    id: 'applicant-002',
    name: '이서연',
    position: '백엔드 개발자',
    email: 'applicant2@example.com',
    phone: '010-1001-2037',
    appliedAt: '2026-07-30',
    stage: 'interview',
    experienceYears: 5,
    summary: '안정적인 시스템 개발을 중요하게 생각합니다.',
  },
]

describe('App', () => {
  it('renders applicants in recruitment stage columns', async () => {
    vi.mocked(getApplicants).mockResolvedValue(applicants)

    render(
      <QueryProvider>
        <App />
      </QueryProvider>,
    )

    expect(screen.getByRole('heading', { name: '채용 파이프라인' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(5)
    expect(await screen.findByRole('heading', { name: '김서준' })).toBeInTheDocument()
    expect(screen.getByText('프론트엔드 개발자')).toBeInTheDocument()
    expect(screen.getByText('전체 지원자 2명')).toBeInTheDocument()
  })

  it('requests a stage change from an applicant action', async () => {
    const user = userEvent.setup()
    vi.mocked(getApplicants).mockResolvedValue(applicants)
    vi.mocked(updateApplicantStage).mockResolvedValue({ ...applicants[0], stage: 'interview' })

    render(
      <QueryProvider>
        <App />
      </QueryProvider>,
    )

    await user.click(await screen.findByRole('button', { name: '면접으로 이동' }))

    await waitFor(() => {
      expect(updateApplicantStage).toHaveBeenCalledWith('applicant-001', 'interview')
    })
  })
})
