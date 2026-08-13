import { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateApplicantStage } from '../api/applicants'
import type { Applicant, ApplicantStage } from '../types/applicant'
import { applicantQueryKey } from './useApplicants'

export interface MoveApplicantVariables {
  applicantId: string
  stage: ApplicantStage
}

export function useMoveApplicantStage() {
  const queryClient = useQueryClient()
  const pendingApplicantIds = useRef(new Set<string>())

  const mutation = useMutation({
    mutationFn: ({ applicantId, stage }: MoveApplicantVariables) =>
      updateApplicantStage(applicantId, stage),
    onMutate: async ({ applicantId, stage }) => {
      await queryClient.cancelQueries({ queryKey: applicantQueryKey })

      const previousApplicants = queryClient.getQueryData<Applicant[]>(applicantQueryKey)

      queryClient.setQueryData<Applicant[]>(applicantQueryKey, (currentApplicants = []) =>
        currentApplicants.map((applicant) =>
          applicant.id === applicantId ? { ...applicant, stage } : applicant,
        ),
      )

      return { previousApplicants }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousApplicants) {
        queryClient.setQueryData(applicantQueryKey, context.previousApplicants)
      }
    },
    onSettled: (_data, _error, variables) => {
      pendingApplicantIds.current.delete(variables.applicantId)
      return queryClient.invalidateQueries({ queryKey: applicantQueryKey })
    },
  })

  return {
    ...mutation,
    mutate: (variables: MoveApplicantVariables) => {
      if (pendingApplicantIds.current.has(variables.applicantId)) return

      pendingApplicantIds.current.add(variables.applicantId)
      mutation.mutate(variables)
    },
  }
}
