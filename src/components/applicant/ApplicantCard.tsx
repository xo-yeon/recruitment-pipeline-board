import { STAGE_DEFINITIONS } from '../../constants/stages'
import { STAGE_ACTIONS } from '../../constants/stageActions'
import type { Applicant, ApplicantStage } from '../../types/applicant'
import { StageIcon } from '../stage/StageIcon'
import styles from './ApplicantCard.module.css'

interface ApplicantCardProps {
  applicant: Applicant
  onSelect: (applicantId: string) => void
  onStageChange: (applicantId: string, stage: ApplicantStage) => void
}

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

export function ApplicantCard({ applicant, onSelect, onStageChange }: ApplicantCardProps) {
  const stageLabel = STAGE_DEFINITIONS.find(({ id }) => id === applicant.stage)?.label
  const appliedAt = dateFormatter.format(new Date(`${applicant.appliedAt}T00:00:00`))

  return (
    <article className={styles.card}>
      <button
        className={styles.detailTrigger}
        type="button"
        aria-label={`${applicant.name} 상세 보기`}
        onClick={() => onSelect(applicant.id)}
      />
      <header className={styles.header}>
        <h3>{applicant.name}</h3>
        <span className={styles.stage}>
          <StageIcon stage={applicant.stage} />
          {stageLabel}
        </span>
      </header>
      <p className={styles.position}>{applicant.position}</p>
      <dl className={styles.details}>
        <div>
          <dt>지원일</dt>
          <dd>{appliedAt}</dd>
        </div>
      </dl>
      {STAGE_ACTIONS[applicant.stage].length > 0 && (
        <div className={styles.actions} aria-label={`${applicant.name} 단계 이동`}>
          {STAGE_ACTIONS[applicant.stage].map((action) => (
            <button
              key={action.targetStage}
              className={action.variant === 'danger' ? styles.dangerAction : styles.action}
              type="button"
              onClick={() => onStageChange(applicant.id, action.targetStage)}
            >
              <span className={styles.actionIcon}>
                <StageIcon stage={action.targetStage} />
              </span>
              {action.label}
            </button>
          ))}
        </div>
      )}
    </article>
  )
}
