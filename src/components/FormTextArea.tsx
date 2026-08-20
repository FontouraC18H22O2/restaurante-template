import type { TextareaHTMLAttributes } from 'react'

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
  containerClassName?: string
}

function FormTextArea({ id, label, containerClassName = '', className = '', ...textareaProps }: FormTextAreaProps) {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={id}
        className={`mt-1 w-full rounded border border-border bg-cream px-3 py-2 text-sm text-ink focus:border-terracotta focus:outline-none ${className}`}
        {...textareaProps}
      />
    </div>
  )
}

export default FormTextArea
