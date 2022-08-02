import {ImageSourcePropType} from 'react-native';
import {BigNumberish} from 'ethers';
import {UsdLogo, EthereumLogo, PolygonLogo, BitcoinLogo} from '../components';

export type CurrencySymbols = 'USDC' | 'ETH' | 'MATIC' | 'BTC';

export type CurrencyCategories = 'Stablecoins' | 'Cryptocurrency';

export type CurrencyBalances = Partial<Record<CurrencySymbols, BigNumberish>>;

type CurrencyMeta = {
  name: string;
  displaySymbol: string;
  decimals: number;
  logo: ImageSourcePropType;
  category: CurrencyCategories;
  externalLink?: string;
};

export const CurrencyList: Array<CurrencySymbols> = [
  'USDC',
  'ETH',
  'MATIC',
  'BTC',
];

export const CurrencyCategoryList: Array<CurrencyCategories> = [
  'Stablecoins',
  'Cryptocurrency',
];

export const CurrencyMeta: Record<CurrencySymbols, CurrencyMeta> = {
  USDC: {
    name: 'USDC (USD)',
    displaySymbol: 'USDC',
    decimals: 6,
    logo: UsdLogo,
    category: 'Stablecoins',
    externalLink: 'https://www.stackup.sh/learn/usdc',
  },
  ETH: {
    name: 'Ethereum',
    displaySymbol: 'ETH',
    decimals: 18,
    logo: EthereumLogo,
    category: 'Cryptocurrency',
    externalLink: 'https://www.stackup.sh/learn/eth',
  },
  MATIC: {
    name: 'Matic',
    displaySymbol: 'MATIC',
    decimals: 18,
    logo: PolygonLogo,
    category: 'Cryptocurrency',
    externalLink: 'https://www.stackup.sh/learn/matic',
  },
  BTC: {
    name: 'Bitcoin',
    displaySymbol: 'BTC',
    decimals: 8,
    logo: BitcoinLogo,
    category: 'Cryptocurrency',
    externalLink: 'https://www.stackup.sh/learn/btc',
  },
};
