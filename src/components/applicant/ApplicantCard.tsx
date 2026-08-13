import { STAGE_DEFINITIONS } from '../../constants/stages'
import type { Applicant } from '../../types/applicant'
import styles from './ApplicantCard.module.css'

interface ApplicantCardProps {
  applicant: Applicant
}

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

export function ApplicantCard({ applicant }: ApplicantCardProps) {
  const stageLabel = STAGE_DEFINITIONS.find(({ id }) => id === applicant.stage)?.label
  const appliedAt = dateFormatter.format(new Date(`${applicant.appliedAt}T00:00:00`))

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3>{applicant.name}</h3>
        <span className={styles.stage}>{stageLabel}</span>
      </header>
      <p className={styles.position}>{applicant.position}</p>
      <dl className={styles.details}>
        <div>
          <dt>지원일</dt>
          <dd>{appliedAt}</dd>
        </div>
      </dl>
    </article>
  )
}
