import type { SelectHTMLAttributes } from 'react'

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  containerClassName?: string
}

function FormSelect({ id, label, containerClassName = '', className = '', children, ...selectProps }: FormSelectProps) {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        className={`mt-1 w-full rounded border border-border bg-cream px-3 py-2 text-sm text-ink focus:border-terracotta focus:outline-none ${className}`}
        {...selectProps}
      >
        {children}
      </select>
    </div>
  )
}

export default FormSelect
