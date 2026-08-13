import type { SVGProps } from 'react'

import type { ApplicantStage } from '../../types/applicant'

interface StageIconProps extends SVGProps<SVGSVGElement> {
  stage: ApplicantStage
}

export function StageIcon({ stage, ...props }: StageIconProps) {
  const paths: Record<ApplicantStage, React.ReactNode> = {
    document: (
      <>
        <path d="M7 3.75h5.5L17 8.25V19a1.25 1.25 0 0 1-1.25 1.25H7A1.25 1.25 0 0 1 5.75 19V5A1.25 1.25 0 0 1 7 3.75Z" />
        <path d="M12.5 3.75v4.5H17M8.75 12h5.5M8.75 15.5h5.5" />
      </>
    ),
    interview: (
      <>
        <path d="M5.5 5.25h13v9.5h-7l-4.25 3v-3H5.5a1 1 0 0 1-1-1v-7.5a1 1 0 0 1 1-1Z" />
        <path d="M8 9h7M8 11.75h4.5" />
      </>
    ),
    negotiation: (
      <>
        <path d="m3.75 10 4-4 3 2.25L13.5 6l6.75 5.5-3 3-2-1.5-3.5 3.25-4.25-3.5L5.75 14.5 3.75 12.5Z" />
        <path d="m9.25 10.25 4 3.5M7.5 12.75l1.75-1.75" />
      </>
    ),
    hired: <path d="m5 12.25 4.25 4.25L19 6.75" />,
    rejected: (
      <>
        <circle cx="12" cy="12" r="8.25" />
        <path d="m9 9 6 6M15 9l-6 6" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[stage]}
    </svg>
  )
}
