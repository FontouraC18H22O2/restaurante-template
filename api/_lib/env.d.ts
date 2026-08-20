// As Edge Functions só usam "process.env" (que a Vercel expõe também no
// runtime Edge, apesar de não ser Node.js completo). Declaramos isto à mão
// em vez de depender de "@types/node" — evita um erro de resolução de tipos
// que a Vercel apresenta ao transpilar cada função isoladamente.
declare const process: {
  env: Record<string, string | undefined>
}
