export const SORT_OPTIONS = {
  DEFAULT: 'menu_order',
  POPULARITY: 'popularity',
  NEWNESS: 'date',
  PRICE_ASC: 'price',
  PRICE_DESC: 'price-desc',
} as const;

export type Sorting = typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS];