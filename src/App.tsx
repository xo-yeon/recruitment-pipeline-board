import { useMemo, useState } from 'react'

import { ApplicantDetailPanel } from './components/applicant/ApplicantDetailPanel'
import { PipelineBoard } from './components/board/PipelineBoard'
import { ApplicantFilters } from './components/filters/ApplicantFilters'
import { BoardState } from './components/states/BoardState'
import { useApplicants } from './hooks/useApplicants'
import styles from './App.module.css'

export function App() {
  const {
    data: applicants = [],
    error,
    isError,
    isPending,
    refetch,
  } = useApplicants()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null)
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
  const selectedApplicant = applicants.find(({ id }) => id === selectedApplicantId)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Recruitment workspace</p>
          <h1>채용 파이프라인</h1>
          <p className={styles.description}>지원자의 채용 진행 상황을 한눈에 관리하세요.</p>
        </div>
        <span className={styles.status}>
          {isPending ? '지원자 불러오는 중' : `전체 지원자 ${applicants.length}명`}
        </span>
      </header>
      <main className={styles.main}>
        {isPending ? (
          <BoardState
            variant="loading"
            title="지원자를 불러오고 있습니다"
            description="채용 파이프라인을 준비하고 있습니다."
          />
        ) : isError ? (
          <BoardState
            variant="error"
            title="지원자를 불러오지 못했습니다"
            description={error instanceof Error ? error.message : '잠시 후 다시 시도해주세요.'}
            actionLabel="다시 시도"
            onAction={() => void refetch()}
          />
        ) : applicants.length === 0 ? (
          <BoardState
            variant="empty"
            title="등록된 지원자가 없습니다"
            description="지원자가 등록되면 채용 단계별로 표시됩니다."
          />
        ) : (
          <>
            <ApplicantFilters
              searchTerm={searchTerm}
              selectedPosition={selectedPosition}
              positions={positions}
              resultCount={filteredApplicants.length}
              onSearchTermChange={setSearchTerm}
              onPositionChange={setSelectedPosition}
            />
            {filteredApplicants.length === 0 ? (
              <BoardState
                variant="empty"
                title="검색 결과가 없습니다"
                description="검색어나 직무 필터를 변경해주세요."
              />
            ) : (
              <PipelineBoard
                applicants={filteredApplicants}
                onApplicantSelect={setSelectedApplicantId}
              />
            )}
          </>
        )}
      </main>
      {selectedApplicant && (
        <ApplicantDetailPanel
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicantId(null)}
        />
      )}
    </div>
  )
}
