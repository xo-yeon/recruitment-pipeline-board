import { render, screen, waitFor, within } from '@testing-library/react'
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
    const applicantHeading = await screen.findByRole('heading', { name: '김서준' })
    const applicantCard = applicantHeading.closest('article')

    expect(applicantHeading).toBeInTheDocument()
    expect(within(applicantCard!).getByText('프론트엔드 개발자')).toBeInTheDocument()
    expect(screen.getByText('전체 지원자 2명')).toBeInTheDocument()
  })

  it('filters applicants by name and position', async () => {
    const user = userEvent.setup()
    vi.mocked(getApplicants).mockResolvedValue(applicants)

    render(
      <QueryProvider>
        <App />
      </QueryProvider>,
    )

    await screen.findByRole('heading', { name: '김서준' })
    await user.type(screen.getByRole('searchbox', { name: '지원자 이름 검색' }), '김서준')

    expect(screen.getByRole('heading', { name: '김서준' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '이서연' })).not.toBeInTheDocument()
    expect(screen.getByText('검색 결과 1명')).toBeInTheDocument()

    await user.selectOptions(screen.getByRole('combobox', { name: '직무' }), '백엔드 개발자')
    expect(screen.queryByRole('heading', { name: '김서준' })).not.toBeInTheDocument()
    expect(screen.getByText('검색 결과 0명')).toBeInTheDocument()
  })

  it('opens and closes an applicant detail panel', async () => {
    const user = userEvent.setup()
    vi.mocked(getApplicants).mockResolvedValue(applicants)

    render(
      <QueryProvider>
        <App />
      </QueryProvider>,
    )

    await user.click(await screen.findByRole('button', { name: '김서준 상세 보기' }))

    const panel = screen.getByRole('dialog', { name: '김서준' })
    expect(document.body).toHaveStyle({ overflow: 'hidden' })
    expect(within(panel).getByText('applicant1@example.com')).toBeInTheDocument()
    expect(within(panel).getByText('010-1000-2000')).toBeInTheDocument()
    expect(within(panel).getByText('3년')).toBeInTheDocument()

    await user.click(within(panel).getByRole('button', { name: '닫기' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.body).not.toHaveStyle({ overflow: 'hidden' })
  })

  it('moves an applicant immediately before the API responds', async () => {
    const user = userEvent.setup()
    let resolveUpdate!: (applicant: Applicant) => void
    const updateRequest = new Promise<Applicant>((resolve) => {
      resolveUpdate = resolve
    })
    vi.mocked(getApplicants).mockResolvedValue(applicants)
    vi.mocked(updateApplicantStage).mockReturnValue(updateRequest)

    render(
      <QueryProvider>
        <App />
      </QueryProvider>,
    )

    await user.click(await screen.findByRole('button', { name: '면접으로 이동' }))

    const interviewColumn = screen.getByRole('region', { name: '면접' })
    expect(within(interviewColumn).getByRole('heading', { name: '김서준' })).toBeInTheDocument()
    expect(updateApplicantStage).toHaveBeenCalledWith('applicant-001', 'interview')

    resolveUpdate({ ...applicants[0], stage: 'interview' })
    await updateRequest
  })

  it('restores the applicant and displays feedback when the API fails', async () => {
    const user = userEvent.setup()
    let rejectUpdate!: (error: Error) => void
    const updateRequest = new Promise<Applicant>((_resolve, reject) => {
      rejectUpdate = reject
    })
    vi.mocked(getApplicants).mockResolvedValue(applicants)
    vi.mocked(updateApplicantStage).mockReturnValue(updateRequest)

    render(
      <QueryProvider>
        <App />
      </QueryProvider>,
    )

    await user.click(await screen.findByRole('button', { name: '면접으로 이동' }))
    expect(
      within(screen.getByRole('region', { name: '면접' })).getByRole('heading', {
        name: '김서준',
      }),
    ).toBeInTheDocument()

    rejectUpdate(new Error('단계 변경에 실패했습니다. 다시 시도해주세요.'))

    expect(await screen.findByRole('alert')).toHaveTextContent('단계 변경에 실패했습니다.')
    await waitFor(() => {
      expect(
        within(screen.getByRole('region', { name: '서류 검토' })).getByRole('heading', {
          name: '김서준',
        }),
      ).toBeInTheDocument()
    })
  })
})
