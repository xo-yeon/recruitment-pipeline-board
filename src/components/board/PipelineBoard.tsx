import { useMemo } from 'react'

import type { Applicant } from '../../types/applicant'
import { STAGE_DEFINITIONS } from '../../constants/stages'
import { useMoveApplicantStage } from '../../hooks/useMoveApplicantStage'
import { PipelineColumn } from './PipelineColumn'
import { VirtualizedApplicantList } from './VirtualizedApplicantList'
import styles from './PipelineBoard.module.css'

interface PipelineBoardProps {
  applicants: Applicant[]
  onApplicantSelect: (applicantId: string) => void
}

export function PipelineBoard({ applicants, onApplicantSelect }: PipelineBoardProps) {
  const moveApplicant = useMoveApplicantStage()
  const previousStageLabel = STAGE_DEFINITIONS.find(
    ({ id }) => id === moveApplicant.lastMove?.previousStage,
  )?.label
  const nextStageLabel = STAGE_DEFINITIONS.find(
    ({ id }) => id === moveApplicant.lastMove?.nextStage,
  )?.label
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
      {moveApplicant.lastMove && (
        <div className={styles.undo} role="status">
          <p>
            {moveApplicant.lastMove.applicantName}: {previousStageLabel}에서 {nextStageLabel}(으)로
            이동했습니다.
          </p>
          <button type="button" onClick={moveApplicant.undoLastMove}>
            이동 취소
          </button>
        </div>
      )}
      <div className={styles.board} aria-label="채용 단계별 지원자 보드">
        {STAGE_DEFINITIONS.map((stage) => {
          const stageApplicants = applicantsByStage.get(stage.id) ?? []

          return (
            <PipelineColumn key={stage.id} stage={stage} count={stageApplicants.length}>
              <VirtualizedApplicantList
                applicants={stageApplicants}
                stageLabel={stage.label}
                onApplicantSelect={onApplicantSelect}
                onStageChange={(applicantId, targetStage) =>
                  moveApplicant.mutate({ applicantId, stage: targetStage })
                }
              />
            </PipelineColumn>
          )
        })}
      </div>
    </div>
  )
}
