import styles from './BoardState.module.css'

interface BoardStateProps {
  variant: 'loading' | 'error' | 'empty'
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function BoardState({
  variant,
  title,
  description,
  actionLabel,
  onAction,
}: BoardStateProps) {
  return (
    <section
      className={styles.state}
      data-variant={variant}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      <span className={styles.icon} aria-hidden="true" />
      <h2>{title}</h2>
      <p>{description}</p>
      {actionLabel && onAction && (
        <button type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </section>
  )
}
