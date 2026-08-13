import { useMemo } from 'react'

import type { Applicant } from '../../types/applicant'
import { STAGE_DEFINITIONS } from '../../constants/stages'
import { ApplicantCard } from '../applicant/ApplicantCard'
import { PipelineColumn } from './PipelineColumn'
import styles from './PipelineBoard.module.css'

interface PipelineBoardProps {
  applicants: Applicant[]
}

export function PipelineBoard({ applicants }: PipelineBoardProps) {
  const applicantsByStage = useMemo(
    () =>
      new Map(
        STAGE_DEFINITIONS.map(({ id }) => [
          id,
          applicants.filter(({ stage }) => stage === id),
        ]),
      ),
    [applicants],
  )

  return (
    <div className={styles.board} aria-label="채용 단계별 지원자 보드">
      {STAGE_DEFINITIONS.map((stage) => {
        const stageApplicants = applicantsByStage.get(stage.id) ?? []

        return (
          <PipelineColumn key={stage.id} stage={stage} count={stageApplicants.length}>
            {stageApplicants.map((applicant) => (
              <ApplicantCard key={applicant.id} applicant={applicant} />
            ))}
          </PipelineColumn>
        )
      })}
    </div>
  )
}
