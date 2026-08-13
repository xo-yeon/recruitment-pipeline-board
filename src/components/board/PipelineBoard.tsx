import { useMemo } from 'react'

import type { Applicant } from '../../types/applicant'
import { STAGE_DEFINITIONS } from '../../constants/stages'
import { useMoveApplicantStage } from '../../hooks/useMoveApplicantStage'
import { ApplicantCard } from '../applicant/ApplicantCard'
import { PipelineColumn } from './PipelineColumn'
import styles from './PipelineBoard.module.css'

interface PipelineBoardProps {
  applicants: Applicant[]
  onApplicantSelect: (applicantId: string) => void
}

export function PipelineBoard({ applicants, onApplicantSelect }: PipelineBoardProps) {
  const moveApplicant = useMoveApplicantStage()
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
    <div className={styles.container}>
      {moveApplicant.isError && (
        <p className={styles.error} role="alert">
          {moveApplicant.error instanceof Error
            ? moveApplicant.error.message
            : '단계 변경에 실패했습니다. 다시 시도해주세요.'}
        </p>
      )}
      <div className={styles.board} aria-label="채용 단계별 지원자 보드">
        {STAGE_DEFINITIONS.map((stage) => {
          const stageApplicants = applicantsByStage.get(stage.id) ?? []

          return (
            <PipelineColumn key={stage.id} stage={stage} count={stageApplicants.length}>
              {stageApplicants.map((applicant) => (
                <ApplicantCard
                  key={applicant.id}
                  applicant={applicant}
                  onSelect={onApplicantSelect}
                  onStageChange={(applicantId, targetStage) =>
                    moveApplicant.mutate({ applicantId, stage: targetStage })
                  }
                />
              ))}
            </PipelineColumn>
          )
        })}
      </div>
    </div>
  )
}
