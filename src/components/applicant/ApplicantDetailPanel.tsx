import { useEffect, useRef } from 'react'

import { STAGE_DEFINITIONS } from '../../constants/stages'
import type { Applicant } from '../../types/applicant'
import { StageIcon } from '../stage/StageIcon'
import styles from './ApplicantDetailPanel.module.css'

interface ApplicantDetailPanelProps {
  applicant: Applicant
  onClose: () => void
}

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export function ApplicantDetailPanel({ applicant, onClose }: ApplicantDetailPanelProps) {
  const titleId = `applicant-detail-${applicant.id}`
  const stageLabel = STAGE_DEFINITIONS.find(({ id }) => id === applicant.stage)?.label
  const panelRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )

      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previouslyFocusedElement?.focus()
    }
  }, [onClose])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div className={styles.layer}>
      <button
        className={styles.backdrop}
        type="button"
        aria-label="상세 패널 닫기"
        tabIndex={-1}
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Applicant detail</p>
            <h2 id={titleId}>{applicant.name}</h2>
          </div>
          <button
            ref={closeButtonRef}
            className={styles.close}
            type="button"
            aria-label="닫기"
            onClick={onClose}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div className={styles.stage}>
          <StageIcon stage={applicant.stage} />
          <span>{stageLabel}</span>
        </div>

        <dl className={styles.details}>
          <div><dt>지원 직무</dt><dd>{applicant.position}</dd></div>
          <div><dt>지원일</dt><dd>{dateFormatter.format(new Date(`${applicant.appliedAt}T00:00:00`))}</dd></div>
          <div><dt>경력</dt><dd>{applicant.experienceYears}년</dd></div>
          <div><dt>이메일</dt><dd>{applicant.email}</dd></div>
          <div><dt>연락처</dt><dd>{applicant.phone}</dd></div>
        </dl>

        <section className={styles.summary} aria-labelledby={`${titleId}-summary`}>
          <h3 id={`${titleId}-summary`}>지원자 소개</h3>
          <p>{applicant.summary}</p>
        </section>
      </aside>
    </div>
  )
}
