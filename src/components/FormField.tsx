import type { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  containerClassName?: string
}

function FormField({ id, label, containerClassName = '', className = '', ...inputProps }: FormFieldProps) {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        className={`mt-1 w-full rounded border border-border bg-cream px-3 py-2 text-sm text-ink focus:border-terracotta focus:outline-none ${className}`}
        {...inputProps}
      />
    </div>
  )
}

export default FormField
