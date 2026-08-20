import type { MenuCategory, MenuItem } from '../types/restaurant'

// Dados fictícios de exemplo — trocar por client ao adaptar o template.
export const menuCategories: MenuCategory[] = [
  { id: 'starters', label: { pt: 'Entradas', en: 'Starters' } },
  { id: 'mains', label: { pt: 'Pratos Principais', en: 'Main Courses' } },
  { id: 'desserts', label: { pt: 'Sobremesas', en: 'Desserts' } },
  { id: 'drinks', label: { pt: 'Bebidas', en: 'Drinks' } },
]

export const menuItems: MenuItem[] = [
  {
    id: 'starter-garlic-bread',
    category: 'starters',
    name: { pt: 'Pão de Alho Caseiro', en: 'Homemade Garlic Bread' },
    description: {
      pt: 'Pão artesanal com manteiga de alho e ervas frescas',
      en: 'Artisan bread with garlic butter and fresh herbs',
    },
    price: 4.5,
  },
  {
    id: 'starter-cheese-board',
    category: 'starters',
    name: { pt: 'Tábua de Queijos e Enchidos', en: 'Cheese and Cold Cuts Board' },
    description: {
      pt: 'Seleção de queijos regionais e enchidos tradicionais',
      en: 'Selection of regional cheeses and traditional cold cuts',
    },
    price: 9.5,
  },
  {
    id: 'main-bacalhau-bras',
    category: 'mains',
    name: { pt: 'Bacalhau à Brás', en: 'Bacalhau à Brás' },
    description: {
      pt: 'Bacalhau desfiado com batata palha, ovo e azeitonas',
      en: 'Shredded codfish with straw fries, egg and olives',
    },
    price: 14.9,
  },
  {
    id: 'main-mushroom-risotto',
    category: 'mains',
    name: { pt: 'Risotto de Cogumelos Selvagens', en: 'Wild Mushroom Risotto' },
    description: {
      pt: 'Arroz cremoso com cogumelos selvagens e parmesão',
      en: 'Creamy rice with wild mushrooms and parmesan',
    },
    price: 13.5,
  },
  {
    id: 'main-pork-ribs',
    category: 'mains',
    name: { pt: 'Entrecosto Grelhado', en: 'Grilled Pork Ribs' },
    description: {
      pt: 'Entrecosto grelhado com puré de batata doce',
      en: 'Grilled pork ribs with sweet potato mash',
    },
    price: 15.9,
  },
  {
    id: 'dessert-pastel-nata',
    category: 'desserts',
    name: { pt: 'Pastel de Nata', en: 'Custard Tart' },
    description: {
      pt: 'Clássico pastel de nata português, servido morno',
      en: 'Classic Portuguese custard tart, served warm',
    },
    price: 3.5,
  },
  {
    id: 'dessert-chocolate-cake',
    category: 'desserts',
    name: { pt: 'Bolo de Chocolate com Gelado', en: 'Chocolate Cake with Ice Cream' },
    description: {
      pt: 'Bolo de chocolate quente com gelado de baunilha',
      en: 'Warm chocolate cake with vanilla ice cream',
    },
    price: 5.5,
  },
  {
    id: 'drink-house-wine',
    category: 'drinks',
    name: { pt: 'Vinho da Casa (copo)', en: 'House Wine (glass)' },
    description: {
      pt: 'Vinho tinto ou branco da região',
      en: 'Red or white wine from the region',
    },
    price: 3.5,
  },
  {
    id: 'drink-water',
    category: 'drinks',
    name: { pt: 'Água Mineral', en: 'Mineral Water' },
    description: {
      pt: 'Água com ou sem gás, 50cl',
      en: 'Still or sparkling water, 50cl',
    },
    price: 2.0,
  },
]
