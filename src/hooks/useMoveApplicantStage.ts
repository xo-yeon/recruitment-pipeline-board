import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateApplicantStage } from '../api/applicants'
import type { Applicant, ApplicantStage } from '../types/applicant'
import { applicantQueryKey } from './useApplicants'

export interface MoveApplicantVariables {
  applicantId: string
  stage: ApplicantStage
  isUndo?: boolean
}

export interface LastApplicantMove {
  applicantId: string
  applicantName: string
  previousStage: ApplicantStage
  nextStage: ApplicantStage
}

export function useMoveApplicantStage() {
  const queryClient = useQueryClient()
  const pendingApplicantIds = useRef(new Set<string>())
  const [lastMove, setLastMove] = useState<LastApplicantMove | null>(null)

  const mutation = useMutation({
    mutationFn: ({ applicantId, stage }: MoveApplicantVariables) =>
      updateApplicantStage(applicantId, stage),
    onMutate: async ({ applicantId, stage }) => {
      await queryClient.cancelQueries({ queryKey: applicantQueryKey })

      const previousApplicants = queryClient.getQueryData<Applicant[]>(applicantQueryKey)
      const previousApplicant = previousApplicants?.find(({ id }) => id === applicantId)

      queryClient.setQueryData<Applicant[]>(applicantQueryKey, (currentApplicants = []) =>
        currentApplicants.map((applicant) =>
          applicant.id === applicantId ? { ...applicant, stage } : applicant,
        ),
      )

      return { previousApplicants, previousApplicant }
    },
    onSuccess: (_updatedApplicant, variables, context) => {
      if (variables.isUndo) {
        setLastMove(null)
        return
      }

      if (context?.previousApplicant) {
        setLastMove({
          applicantId: variables.applicantId,
          applicantName: context.previousApplicant.name,
          previousStage: context.previousApplicant.stage,
          nextStage: variables.stage,
        })
      }
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
    lastMove,
    undoLastMove: () => {
      if (!lastMove || pendingApplicantIds.current.has(lastMove.applicantId)) return

      pendingApplicantIds.current.add(lastMove.applicantId)
      mutation.mutate({
        applicantId: lastMove.applicantId,
        stage: lastMove.previousStage,
        isUndo: true,
      })
    },
  }
}
