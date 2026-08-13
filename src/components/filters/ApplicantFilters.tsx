import styles from './ApplicantFilters.module.css'

interface ApplicantFiltersProps {
  searchTerm: string
  selectedPosition: string
  positions: string[]
  resultCount: number
  onSearchTermChange: (value: string) => void
  onPositionChange: (value: string) => void
}

export function ApplicantFilters({
  searchTerm,
  selectedPosition,
  positions,
  resultCount,
  onSearchTermChange,
  onPositionChange,
}: ApplicantFiltersProps) {
  return (
    <section className={styles.filters} aria-label="지원자 검색 및 필터">
      <label className={styles.searchField}>
        <span className={styles.srOnly}>지원자 이름 검색</span>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <input
          type="search"
          value={searchTerm}
          placeholder="지원자 이름 검색"
          onChange={(event) => onSearchTermChange(event.target.value)}
        />
      </label>

      <label className={styles.selectField}>
        <span>직무</span>
        <select
          value={selectedPosition}
          onChange={(event) => onPositionChange(event.target.value)}
        >
          <option value="">전체 직무</option>
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
      </label>

      <p className={styles.result} aria-live="polite">
        검색 결과 {resultCount}명
      </p>
    </section>
  )
}
