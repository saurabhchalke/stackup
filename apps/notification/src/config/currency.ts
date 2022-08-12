export type CurrencySymbols = "USDC" | "ETH" | "MATIC" | "BTC";

type CurrencyMeta = {
  name: string;
  decimals: number;
};

export const ValidCurrencies = new Set<CurrencySymbols>([
  "USDC",
  "ETH",
  "MATIC",
  "BTC",
]);

export const CurrencyMeta: Record<CurrencySymbols, CurrencyMeta> = {
  USDC: {
    name: "USDC (USD)",
    decimals: 6,
  },
  ETH: {
    name: "Ethereum",
    decimals: 18,
  },
  MATIC: {
    name: "Matic",
    decimals: 18,
  },
  BTC: {
    name: "Bitcoin",
    decimals: 8,
  },
};
