import type { Applicant } from '../types/applicant'
import { APPLICANT_STAGES } from '../types/applicant'

const LAST_NAMES = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임']
const FIRST_NAMES = [
  '서준',
  '서연',
  '도윤',
  '지우',
  '하준',
  '하윤',
  '민준',
  '지민',
  '예준',
  '수아',
]
const POSITIONS = [
  '프론트엔드 개발자',
  '백엔드 개발자',
  '프로덕트 디자이너',
  '데이터 분석가',
  '프로덕트 매니저',
]
const SUMMARIES = [
  '사용자 경험 개선과 협업을 중요하게 생각합니다.',
  '문제를 구조화하고 안정적인 해결책을 만드는 데 강점이 있습니다.',
  '데이터를 근거로 제품의 우선순위를 결정한 경험이 있습니다.',
  '복잡한 요구사항을 단순한 인터페이스로 풀어내는 것을 좋아합니다.',
  '빠른 실행과 지속적인 피드백을 통해 제품을 개선해 왔습니다.',
]

const APPLIED_AT_BASE = Date.UTC(2026, 6, 31)

function formatDate(daysAgo: number) {
  return new Date(APPLIED_AT_BASE - daysAgo * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
}

export function createApplicantSeed(count = 250): Applicant[] {
  return Array.from({ length: count }, (_, index) => {
    const sequence = index + 1

    return {
      id: `applicant-${String(sequence).padStart(3, '0')}`,
      name: `${LAST_NAMES[index % LAST_NAMES.length]}${FIRST_NAMES[Math.floor(index / LAST_NAMES.length) % FIRST_NAMES.length]}`,
      position: POSITIONS[index % POSITIONS.length],
      email: `applicant${sequence}@example.com`,
      phone: `010-${String(1000 + (index % 9000)).padStart(4, '0')}-${String(2000 + ((index * 37) % 8000)).padStart(4, '0')}`,
      appliedAt: formatDate(index % 120),
      stage: APPLICANT_STAGES[index % APPLICANT_STAGES.length],
      experienceYears: index % 13,
      summary: SUMMARIES[index % SUMMARIES.length],
    }
  })
}
