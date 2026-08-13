import type { ApplicantStage } from '../types/applicant'

export interface StageDefinition {
  id: ApplicantStage
  label: string
  description: string
}

export const STAGE_DEFINITIONS: readonly StageDefinition[] = [
  {
    id: 'document',
    label: '서류 검토',
    description: '지원서와 경력을 검토합니다.',
  },
  {
    id: 'interview',
    label: '면접',
    description: '인터뷰 일정을 진행합니다.',
  },
  {
    id: 'negotiation',
    label: '처우 협의',
    description: '합류 조건을 조율합니다.',
  },
  {
    id: 'hired',
    label: '최종 합격',
    description: '채용이 확정된 지원자입니다.',
  },
  {
    id: 'rejected',
    label: '불합격',
    description: '채용 절차가 종료되었습니다.',
  },
]
