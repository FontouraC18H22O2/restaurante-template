import type { ReactNode } from 'react'

interface SectionHeadingProps {
  children: ReactNode
  className?: string
}

function SectionHeading({ children, className = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 className="font-display text-3xl font-semibold text-ink">{children}</h2>
      <span aria-hidden="true" className="mt-3 block h-1 w-16 rounded bg-terracotta" />
    </div>
  )
}

export default SectionHeading
