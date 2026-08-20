// Campo-armadilha anti-spam: invisível e inacessível para pessoas (posicionado
// fora do ecrã, fora da navegação por Tab, escondido de leitores de ecrã),
// mas visível no HTML para bots que preenchem formulários automaticamente.
// Se vier preenchido, o backend trata o pedido como spam (ver api/_lib/validation.ts).
function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  )
}

export default HoneypotField
