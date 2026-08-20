import type { SupportedLanguage } from '../i18n'

// Texto que existe em ambos os idiomas suportados — usado em todo o conteúdo
// do restaurante (nome de pratos, descrições, horários, etc.), para que trocar
// o conteúdo por um cliente novo não obrigue a mexer nos componentes.
export type LocalizedText = Record<SupportedLanguage, string>

export type MenuCategoryId = 'starters' | 'mains' | 'desserts' | 'drinks'

export interface MenuCategory {
  id: MenuCategoryId
  label: LocalizedText
}

export interface MenuItem {
  id: string
  category: MenuCategoryId
  name: LocalizedText
  description: LocalizedText
  /** Preço em euros. */
  price: number
}

export interface OpeningHoursEntry {
  days: LocalizedText
  hours: LocalizedText
}

export interface GalleryPhoto {
  src: string
  alt: LocalizedText
}

export interface RestaurantInfo {
  /** Nome comercial — não traduzido. */
  name: string
  tagline: LocalizedText
  description: LocalizedText
  address: string
  phone: string
  email: string
  openingHours: OpeningHoursEntry[]
  /** URL de embed do Google Maps (formato "output=embed", sem necessidade de API key). */
  mapEmbedUrl: string
  socials: {
    instagram?: string
    facebook?: string
  }
}
