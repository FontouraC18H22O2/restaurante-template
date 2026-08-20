# Restaurante Template

Template genérico de site para restaurantes, pensado para ser reutilizado e
adaptado rapidamente a clientes diferentes (basta trocar `src/data/` e
`src/i18n/locales/`).

## Stack

- **React 19 + Vite 8 + TypeScript** — frontend estático.
- **Tailwind CSS 4** — estilos.
- **react-i18next** — site em Português e Inglês.
- **Funções serverless na Vercel** (`/api`) — único código que corre em
  servidor: recebe os formulários de contacto/reserva, valida os dados e
  envia email via [Resend](https://resend.com). Nenhum dado é guardado em
  base de dados nem chave de API é exposta ao browser.

## Correr localmente

```bash
npm install
npm run dev
```

## Variáveis de ambiente

Copiar `.env.example` para `.env` e preencher (ver comentários no ficheiro).
O `.env` nunca é commitado.

## Estrutura de pastas

```
api/            Funções serverless (Vercel) — contacto e reservas
public/         Ficheiros estáticos (imagens, etc.)
src/components/ UI reutilizável
src/sections/   Secções da página (Hero, Menu, Sobre, Galeria, Reservas, Contacto, Footer)
src/data/       Conteúdo do restaurante (menu, informação) — o que se troca por cliente
src/i18n/       Configuração e traduções (pt/en)
src/hooks/      Lógica reutilizável
src/types/      Tipos TypeScript partilhados
```

## Deploy

Alojado na Vercel. O deploy faz build do frontend estático (`vite build`)
e publica as funções em `api/` automaticamente.
