import { createApplicantSeed } from '../mocks/applicantSeed'
import {
  APPLICANT_STAGES,
  type Applicant,
  type ApplicantStage,
} from '../types/applicant'

const STORAGE_KEY = 'recruitment-pipeline-board:applicants:v1'
const STORAGE_VERSION = 1
const MIN_DELAY_MS = 200
const MAX_DELAY_MS = 800
const UPDATE_FAILURE_RATE = 0.15

interface StoredApplicants {
  version: typeof STORAGE_VERSION
  applicants: Applicant[]
}

export class ApplicantNotFoundError extends Error {
  constructor(id: string) {
    super(`지원자를 찾을 수 없습니다: ${id}`)
    this.name = 'ApplicantNotFoundError'
  }
}

export class MockApiError extends Error {
  constructor() {
    super('단계 변경에 실패했습니다. 잠시 후 다시 시도해주세요.')
    this.name = 'MockApiError'
  }
}

function cloneApplicants(applicants: Applicant[]) {
  return applicants.map((applicant) => ({ ...applicant }))
}

function isApplicantStage(value: unknown): value is ApplicantStage {
  return typeof value === 'string' && APPLICANT_STAGES.includes(value as ApplicantStage)
}

function isApplicant(value: unknown): value is Applicant {
  if (!value || typeof value !== 'object') {
    return false
  }

  const applicant = value as Record<string, unknown>

  return (
    typeof applicant.id === 'string' &&
    typeof applicant.name === 'string' &&
    typeof applicant.position === 'string' &&
    typeof applicant.email === 'string' &&
    typeof applicant.phone === 'string' &&
    typeof applicant.appliedAt === 'string' &&
    isApplicantStage(applicant.stage) &&
    typeof applicant.experienceYears === 'number' &&
    typeof applicant.summary === 'string'
  )
}

function isStoredApplicants(value: unknown): value is StoredApplicants {
  if (!value || typeof value !== 'object') {
    return false
  }

  const stored = value as Partial<StoredApplicants>

  return (
    stored.version === STORAGE_VERSION &&
    Array.isArray(stored.applicants) &&
    stored.applicants.every(isApplicant)
  )
}

function writeApplicants(applicants: Applicant[]) {
  const data: StoredApplicants = {
    version: STORAGE_VERSION,
    applicants,
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function readApplicants() {
  const storedValue = localStorage.getItem(STORAGE_KEY)

  if (storedValue) {
    try {
      const parsed: unknown = JSON.parse(storedValue)

      if (isStoredApplicants(parsed)) {
        return cloneApplicants(parsed.applicants)
      }
    } catch {
      // 손상된 저장 데이터는 초기 시드로 복구한다.
    }
  }

  const seed = createApplicantSeed()
  writeApplicants(seed)
  return cloneApplicants(seed)
}

function waitForNetwork() {
  const delay = Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1)) + MIN_DELAY_MS
  return new Promise<void>((resolve) => window.setTimeout(resolve, delay))
}

export async function getApplicants(): Promise<Applicant[]> {
  await waitForNetwork()
  return readApplicants()
}

export async function updateApplicantStage(
  applicantId: string,
  stage: ApplicantStage,
): Promise<Applicant> {
  await waitForNetwork()

  if (Math.random() < UPDATE_FAILURE_RATE) {
    throw new MockApiError()
  }

  const applicants = readApplicants()
  const applicantIndex = applicants.findIndex(({ id }) => id === applicantId)

  if (applicantIndex === -1) {
    throw new ApplicantNotFoundError(applicantId)
  }

  const updatedApplicant = { ...applicants[applicantIndex], stage }
  applicants[applicantIndex] = updatedApplicant
  writeApplicants(applicants)

  return { ...updatedApplicant }
}
