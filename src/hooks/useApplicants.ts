import { useQuery } from '@tanstack/react-query'

import { getApplicants } from '../api/applicants'

export const applicantQueryKey = ['applicants'] as const

export function useApplicants() {
  return useQuery({ queryKey: applicantQueryKey, queryFn: getApplicants })
}
