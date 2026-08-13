import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { updateApplicantStage } from '../api/applicants'
import type { Applicant } from '../types/applicant'
import { applicantQueryKey } from './useApplicants'
import { useMoveApplicantStage } from './useMoveApplicantStage'

vi.mock('../api/applicants', () => ({
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

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useMoveApplicantStage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('updates the applicant cache before the API responds', async () => {
    const queryClient = createQueryClient()
    let resolveUpdate!: (applicant: Applicant) => void
    vi.mocked(updateApplicantStage).mockReturnValue(
      new Promise<Applicant>((resolve) => {
        resolveUpdate = resolve
      }),
    )
    queryClient.setQueryData(applicantQueryKey, applicants)
    const { result } = renderHook(() => useMoveApplicantStage(), {
      wrapper: createWrapper(queryClient),
    })

    act(() => {
      result.current.mutate({ applicantId: 'applicant-001', stage: 'interview' })
    })

    await waitFor(() => {
      expect(queryClient.getQueryData<Applicant[]>(applicantQueryKey)?.[0].stage).toBe(
        'interview',
      )
    })
    expect(updateApplicantStage).toHaveBeenCalledWith('applicant-001', 'interview')

    act(() => {
      resolveUpdate({ ...applicants[0], stage: 'interview' })
    })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })

  it('restores the complete previous cache when the API fails', async () => {
    const queryClient = createQueryClient()
    let rejectUpdate!: (error: Error) => void
    vi.mocked(updateApplicantStage).mockReturnValue(
      new Promise<Applicant>((_resolve, reject) => {
        rejectUpdate = reject
      }),
    )
    queryClient.setQueryData(applicantQueryKey, applicants)
    const { result } = renderHook(() => useMoveApplicantStage(), {
      wrapper: createWrapper(queryClient),
    })

    act(() => {
      result.current.mutate({ applicantId: 'applicant-001', stage: 'interview' })
    })

    await waitFor(() => {
      expect(queryClient.getQueryData<Applicant[]>(applicantQueryKey)?.[0].stage).toBe(
        'interview',
      )
    })

    act(() => {
      rejectUpdate(new Error('단계 변경 실패'))
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(queryClient.getQueryData(applicantQueryKey)).toStrictEqual(applicants)
  })

  it('ignores another move for the same applicant while its request is pending', async () => {
    const queryClient = createQueryClient()
    let resolveUpdate!: (applicant: Applicant) => void
    vi.mocked(updateApplicantStage).mockReturnValue(
      new Promise<Applicant>((resolve) => {
        resolveUpdate = resolve
      }),
    )
    queryClient.setQueryData(applicantQueryKey, applicants)
    const { result } = renderHook(() => useMoveApplicantStage(), {
      wrapper: createWrapper(queryClient),
    })

    act(() => {
      result.current.mutate({ applicantId: 'applicant-001', stage: 'interview' })
      result.current.mutate({ applicantId: 'applicant-001', stage: 'negotiation' })
    })

    await waitFor(() => expect(updateApplicantStage).toHaveBeenCalledTimes(1))
    expect(updateApplicantStage).toHaveBeenCalledWith('applicant-001', 'interview')
    expect(queryClient.getQueryData<Applicant[]>(applicantQueryKey)?.[0].stage).toBe('interview')

    act(() => {
      resolveUpdate({ ...applicants[0], stage: 'interview' })
    })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })

  it('allows another applicant to move while a request is pending', async () => {
    const queryClient = createQueryClient()
    vi.mocked(updateApplicantStage).mockReturnValue(new Promise<Applicant>(() => undefined))
    queryClient.setQueryData(applicantQueryKey, applicants)
    const { result } = renderHook(() => useMoveApplicantStage(), {
      wrapper: createWrapper(queryClient),
    })

    act(() => {
      result.current.mutate({ applicantId: 'applicant-001', stage: 'interview' })
      result.current.mutate({ applicantId: 'applicant-002', stage: 'negotiation' })
    })

    await waitFor(() => expect(updateApplicantStage).toHaveBeenCalledTimes(2))
    expect(queryClient.getQueryData<Applicant[]>(applicantQueryKey)?.map(({ stage }) => stage)).toEqual([
      'interview',
      'negotiation',
    ])
  })
})
