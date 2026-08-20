import type { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  containerClassName?: string
}

function FormField({ id, label, containerClassName = '', className = '', ...inputProps }: FormFieldProps) {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <input
        id={id}
        className={`mt-1 w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none ${className}`}
        {...inputProps}
      />
    </div>
  )
}

export default FormField
