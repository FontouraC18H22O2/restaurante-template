import type { GalleryPhoto } from '../types/restaurant'

// Fotos fictícias (geradas por IA) de pratos do menu, para preencher a
// galeria com algo visualmente coerente enquanto não há fotos reais do
// cliente. Substituir por fotografia real do espaço/pratos ao adaptar o
// template — basta trocar os ficheiros em public/images/gallery/ e esta lista.
export const galleryPhotos: GalleryPhoto[] = [
  {
    src: '/images/gallery/garlic-bread.webp',
    alt: { pt: 'Pão de alho caseiro', en: 'Homemade garlic bread' },
  },
  {
    src: '/images/gallery/cheese-board.webp',
    alt: { pt: 'Tábua de queijos e enchidos', en: 'Cheese and cold cuts board' },
  },
  {
    src: '/images/gallery/bacalhau-a-bras.webp',
    alt: { pt: 'Bacalhau à Brás', en: 'Bacalhau à Brás' },
  },
  {
    src: '/images/gallery/pastel-de-nata.webp',
    alt: { pt: 'Pastéis de nata', en: 'Custard tarts' },
  },
]
