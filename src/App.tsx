import { PipelineBoard } from './components/board/PipelineBoard'
import { useApplicants } from './hooks/useApplicants'
import styles from './App.module.css'

export function App() {
  const { data: applicants = [] } = useApplicants()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Recruitment workspace</p>
          <h1>채용 파이프라인</h1>
          <p className={styles.description}>지원자의 채용 진행 상황을 한눈에 관리하세요.</p>
        </div>
        <span className={styles.status}>전체 지원자 {applicants.length}명</span>
      </header>
      <main className={styles.main}>
        <PipelineBoard applicants={applicants} />
      </main>
    </div>
  )
}
