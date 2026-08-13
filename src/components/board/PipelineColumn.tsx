import type { PropsWithChildren } from 'react'

import type { StageDefinition } from '../../constants/stages'
import styles from './PipelineColumn.module.css'

interface PipelineColumnProps extends PropsWithChildren {
  stage: StageDefinition
  count?: number
}

export function PipelineColumn({ stage, count = 0, children }: PipelineColumnProps) {
  const headingId = `stage-${stage.id}`

  return (
    <section className={styles.column} data-stage={stage.id} aria-labelledby={headingId}>
      <header className={styles.header}>
        <div>
          <h2 id={headingId}>{stage.label}</h2>
          <p>{stage.description}</p>
        </div>
        <span className={styles.count} aria-label={`${stage.label} 지원자 ${count}명`}>
          {count}
        </span>
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  )
}
