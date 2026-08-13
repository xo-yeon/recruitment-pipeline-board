import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateApplicantStage } from '../api/applicants'
import type { ApplicantStage } from '../types/applicant'
import { applicantQueryKey } from './useApplicants'

export interface MoveApplicantVariables {
  applicantId: string
  stage: ApplicantStage
}

export function useMoveApplicantStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ applicantId, stage }: MoveApplicantVariables) =>
      updateApplicantStage(applicantId, stage),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applicantQueryKey }),
  })
}
