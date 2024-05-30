import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPriceWorld = (price: number, locale: string, currency: string) => {
  let options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency,
  };

  if (locale === 'zh-TW') {
    options = {
      ...options,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
  }

  const formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(price);
}

// exchange
const EXCHANGE_RATES = {
  TWD: 1,
  USD: 30,
};

export type CurrencyProps = 'TWD' | 'USD';

export const convertPrice = (priceInTWD: number, targetCurrency: CurrencyProps) => {
  const exchangeRate = EXCHANGE_RATES[targetCurrency] || 1;
  return priceInTWD / exchangeRate;
};

export const getPriceWithLocale = (priceInTWD: number, userLocale: string, userCurrency: CurrencyProps) => {

  const convertedPrice = convertPrice(priceInTWD, userCurrency);

  return formatPriceWorld(convertedPrice, userLocale, userCurrency);
};