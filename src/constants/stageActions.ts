import type { ApplicantStage } from '../types/applicant'

export interface StageAction {
  label: string
  targetStage: ApplicantStage
  variant: 'default' | 'danger'
}

export const STAGE_ACTIONS: Record<ApplicantStage, readonly StageAction[]> = {
  document: [
    { label: '면접으로 이동', targetStage: 'interview', variant: 'default' },
    { label: '불합격 처리', targetStage: 'rejected', variant: 'danger' },
  ],
  interview: [
    { label: '서류 검토로 이동', targetStage: 'document', variant: 'default' },
    { label: '처우 협의로 이동', targetStage: 'negotiation', variant: 'default' },
    { label: '불합격 처리', targetStage: 'rejected', variant: 'danger' },
  ],
  negotiation: [
    { label: '면접으로 이동', targetStage: 'interview', variant: 'default' },
    { label: '최종 합격 처리', targetStage: 'hired', variant: 'default' },
    { label: '불합격 처리', targetStage: 'rejected', variant: 'danger' },
  ],
  hired: [],
  rejected: [],
}
