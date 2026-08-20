import type { PropsWithChildren } from 'react'

type SectionContainerProps = PropsWithChildren<{
  id: string
  className?: string
}>

// Wrapper comum a todas as secções da página: define o id usado pela navegação
// por âncora e o "scroll-mt" que compensa a altura do header fixo (sticky),
// para o topo da secção não ficar escondido atrás dele ao fazer scroll.
function SectionContainer({ id, className = '', children }: SectionContainerProps) {
  return (
    <section id={id} className={`scroll-mt-16 px-4 py-16 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

export default SectionContainer
