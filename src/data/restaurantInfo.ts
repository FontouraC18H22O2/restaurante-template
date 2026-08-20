import type { RestaurantInfo } from '../types/restaurant'

// Dados fictícios de exemplo — é isto que se troca ao adaptar o template
// a um cliente real (nome, morada, horário, contactos, redes sociais, mapa).
export const restaurantInfo: RestaurantInfo = {
  name: 'Sabor & Arte',
  tagline: {
    pt: 'Cozinha tradicional portuguesa com um toque contemporâneo',
    en: 'Traditional Portuguese cuisine with a contemporary twist',
  },
  description: {
    pt: 'Desde 2010 que servimos pratos que juntam receitas de família a técnicas modernas, com ingredientes frescos escolhidos todos os dias no mercado local.',
    en: 'Since 2010 we have served dishes that bring together family recipes and modern techniques, with fresh ingredients chosen daily at the local market.',
  },
  address: 'Rua das Flores, 123, 1200-192 Lisboa',
  phone: '+351 21 123 4567',
  email: 'geral@saborarte.pt',
  openingHours: [
    {
      days: { pt: 'Terça a Sexta', en: 'Tuesday to Friday' },
      hours: { pt: '12:00–15:00 e 19:00–23:00', en: '12:00–3:00 PM and 7:00–11:00 PM' },
    },
    {
      days: { pt: 'Sábado e Domingo', en: 'Saturday and Sunday' },
      hours: { pt: '12:00–23:00', en: '12:00 PM–11:00 PM' },
    },
    {
      days: { pt: 'Segunda-feira', en: 'Monday' },
      hours: { pt: 'Encerrado', en: 'Closed' },
    },
  ],
  // Embed sem API key — basta trocar o texto da morada na query "q=" por cliente.
  mapEmbedUrl: 'https://www.google.com/maps?q=Rua+das+Flores+123+Lisboa&output=embed',
  socials: {
    instagram: 'https://instagram.com/saborarte',
    facebook: 'https://facebook.com/saborarte',
  },
}
