import { useMemo, useState } from 'react'

import { PipelineBoard } from './components/board/PipelineBoard'
import { ApplicantFilters } from './components/filters/ApplicantFilters'
import { useApplicants } from './hooks/useApplicants'
import styles from './App.module.css'

export function App() {
  const { data: applicants = [] } = useApplicants()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')
  const positions = useMemo(
    () => [...new Set(applicants.map(({ position }) => position))].sort(),
    [applicants],
  )
  const filteredApplicants = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase('ko-KR')

    return applicants.filter(
      ({ name, position }) =>
        (!normalizedSearchTerm ||
          name.toLocaleLowerCase('ko-KR').includes(normalizedSearchTerm)) &&
        (!selectedPosition || position === selectedPosition),
    )
  }, [applicants, searchTerm, selectedPosition])

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
        <ApplicantFilters
          searchTerm={searchTerm}
          selectedPosition={selectedPosition}
          positions={positions}
          resultCount={filteredApplicants.length}
          onSearchTermChange={setSearchTerm}
          onPositionChange={setSelectedPosition}
        />
        <PipelineBoard applicants={filteredApplicants} />
      </main>
    </div>
  )
}
