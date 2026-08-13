import { STAGE_DEFINITIONS } from '../../constants/stages'
import { PipelineColumn } from './PipelineColumn'
import styles from './PipelineBoard.module.css'

export function PipelineBoard() {
  return (
    <div className={styles.board} aria-label="채용 단계별 지원자 보드">
      {STAGE_DEFINITIONS.map((stage) => (
        <PipelineColumn key={stage.id} stage={stage} />
      ))}
    </div>
  )
}
