// bg-blue-900 border-blue-900
// bg-zinc-900 border-zinc-900
// bg-rose-900 border-rose-900

import { PRODUCT_PRICES } from '@/config/products'

export const COLORS = [
  { label: 'Black', value: 'black', color: "#000" },
  { label: 'Blue', value: 'blue', color: "#6395ff" },
  { label: 'Rose', value: 'rose', color: "#ffe7b9" },
] as const

export const MODELS = {
  name: 'models',
  options: [
    {
      label: 'iPhone X',
      value: 'iphoneX',
    },
    {
      label: 'iPhone 11',
      value: 'iphone11',
    },
    {
      label: 'iPhone 12',
      value: 'iphone12',
    },
    {
      label: 'iPhone 13',
      value: 'iphone13',
    },
    {
      label: 'iPhone 14',
      value: 'iphone14',
    },
    {
      label: 'iPhone 15',
      value: 'iphone15',
    },
  ],
} as const

export const MATERIALS = {
  name: 'material',
  options: [
    {
      label: '矽膠 Silicone',
      value: 'silicone',
      description: undefined,
      price: PRODUCT_PRICES.material.silicone,
    },
    {
      label: 'PC材質 Polycarbonate',
      value: 'polycarbonate',
      description: 'Scratch-resistant',
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
} as const

export const FINISHES = {
  name: 'finish',
  options: [
    {
      label: '光滑 Smooth',
      value: 'smooth',
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: '磨砂 Textured',
      value: 'textured',
      description: 'Soft grippy',
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
} as const
