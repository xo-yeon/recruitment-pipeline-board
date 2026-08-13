import { useMemo, useState } from 'react'

import type { Applicant, ApplicantStage } from '../../types/applicant'
import { ApplicantCard } from '../applicant/ApplicantCard'
import styles from './VirtualizedApplicantList.module.css'

const ITEM_HEIGHT = 224
const ITEM_GAP = 12
const ITEM_SIZE = ITEM_HEIGHT + ITEM_GAP
const DEFAULT_VIEWPORT_HEIGHT = 704
const OVERSCAN_COUNT = 2

interface VirtualizedApplicantListProps {
  applicants: Applicant[]
  stageLabel: string
  onApplicantSelect: (applicantId: string) => void
  onStageChange: (applicantId: string, stage: ApplicantStage) => void
}

export function VirtualizedApplicantList({
  applicants,
  stageLabel,
  onApplicantSelect,
  onStageChange,
}: VirtualizedApplicantListProps) {
  const [scrollTop, setScrollTop] = useState(0)
  const maxScrollTop = Math.max(
    0,
    applicants.length * ITEM_SIZE - DEFAULT_VIEWPORT_HEIGHT,
  )
  const effectiveScrollTop = Math.min(scrollTop, maxScrollTop)
  const { startIndex, visibleApplicants } = useMemo(() => {
    const firstVisibleIndex = Math.floor(effectiveScrollTop / ITEM_SIZE)
    const visibleCount = Math.ceil(DEFAULT_VIEWPORT_HEIGHT / ITEM_SIZE)
    const nextStartIndex = Math.max(0, firstVisibleIndex - OVERSCAN_COUNT)
    const nextEndIndex = Math.min(
      applicants.length,
      firstVisibleIndex + visibleCount + OVERSCAN_COUNT,
    )

    return {
      startIndex: nextStartIndex,
      visibleApplicants: applicants.slice(nextStartIndex, nextEndIndex),
    }
  }, [applicants, effectiveScrollTop])

  return (
    <div
      className={styles.viewport}
      role="list"
      aria-label={`${stageLabel} 지원자 목록`}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      <div className={styles.spacer} style={{ height: applicants.length * ITEM_SIZE }}>
        {visibleApplicants.map((applicant, visibleIndex) => {
          const applicantIndex = startIndex + visibleIndex

          return (
            <div
              key={applicant.id}
              className={styles.item}
              role="listitem"
              aria-posinset={applicantIndex + 1}
              aria-setsize={applicants.length}
              style={{ transform: `translateY(${applicantIndex * ITEM_SIZE}px)` }}
            >
              <ApplicantCard
                applicant={applicant}
                onSelect={onApplicantSelect}
                onStageChange={onStageChange}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
