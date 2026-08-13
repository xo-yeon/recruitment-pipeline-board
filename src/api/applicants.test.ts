import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getApplicants, MockApiError, updateApplicantStage } from './applicants'

async function finishRequest<T>(request: Promise<T>) {
  await vi.advanceTimersByTimeAsync(800)
  return request
}

describe('applicants mock API', () => {
  beforeEach(() => {
    localStorage.clear()
    window.history.replaceState({}, '', '/')
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('returns 1000 deterministic applicants', async () => {
    const applicants = await finishRequest(getApplicants())

    expect(applicants).toHaveLength(1000)
    expect(applicants[0]).toMatchObject({
      id: 'applicant-001',
      name: '김서준',
      position: '프론트엔드 개발자',
      stage: 'document',
    })
  })

  it('forces a fetch error in development for manual verification', async () => {
    window.history.replaceState({}, '', '/?mock=error')

    const request = getApplicants()
    const expectation = expect(request).rejects.toThrow('지원자 목록 조회에 실패했습니다.')
    await vi.advanceTimersByTimeAsync(800)
    await expectation
  })

  it('persists a successful stage update', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    await finishRequest(getApplicants())

    const updated = await finishRequest(updateApplicantStage('applicant-001', 'interview'))
    const reloaded = await finishRequest(getApplicants())

    expect(updated.stage).toBe('interview')
    expect(reloaded.find(({ id }) => id === updated.id)?.stage).toBe('interview')
  })

  it('does not persist an update when the request fails', async () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.1)
    await finishRequest(getApplicants())

    const request = updateApplicantStage('applicant-001', 'interview')
    const expectation = expect(request).rejects.toBeInstanceOf(MockApiError)
    await vi.advanceTimersByTimeAsync(800)
    await expectation

    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const reloaded = await finishRequest(getApplicants())
    expect(reloaded.find(({ id }) => id === 'applicant-001')?.stage).toBe('document')
  })
})
