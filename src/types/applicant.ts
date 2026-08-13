export const APPLICANT_STAGES = [
  'document',
  'interview',
  'negotiation',
  'hired',
  'rejected',
] as const

export type ApplicantStage = (typeof APPLICANT_STAGES)[number]

export interface Applicant {
  id: string
  name: string
  position: string
  email: string
  phone: string
  appliedAt: string
  stage: ApplicantStage
  experienceYears: number
  summary: string
}
