import axios from "axios";
import { CurrencySymbols, ValidDefaultCurrenies } from "@stackupfinance/config";
import { Env } from "../config";
import { IQuote } from "../models/quote.model";

interface CryptocurrencyMapResponse {
  data: Array<{
    id: number;
    symbol: string;
  }>;
}

interface CryptocurrencyQuoteLatestResponse {
  data: Record<
    string,
    {
      symbol: CurrencySymbols;
      quote: Record<
        string,
        {
          price: number;
        }
      >;
    }
  >;
}

type CurrencyIdMap = Record<CurrencySymbols, number>;

const BASE_CURRENCY_ID_MAP: CurrencyIdMap = {
  USDC: 3408,
  ETH: 1027,
  MATIC: 3890,
  BTC: 1,
};

const COINMARKETCAP_URL = "https://pro-api.coinmarketcap.com";

const fetchIDMap = async (): Promise<CurrencyIdMap> => {
  const response = await axios.get<CryptocurrencyMapResponse>(
    `${COINMARKETCAP_URL}/v1/cryptocurrency/map`,
    {
      params: {
        sort: "cmc_rank",
        limit: "20",
      },
      headers: { "X-CMC_PRO_API_KEY": Env.COINMARKETCAP_API_KEY },
    }
  );

  return response.data.data.reduce(
    (prev, curr) => {
      if (curr.symbol in prev) {
        return {
          ...prev,
          [curr.symbol]: curr.id,
        };
      }
      return prev;
    },
    { ...BASE_CURRENCY_ID_MAP }
  );
};

export const getLatestQuotes = async (
  quoteCurrency: CurrencySymbols
): Promise<Array<IQuote>> => {
  if (!ValidDefaultCurrenies.includes(quoteCurrency)) {
    throw new Error("Invalid quote currency");
  }

  const idMap = await fetchIDMap();
  const ids = Object.entries(idMap)
    .filter(([currency]) => currency !== quoteCurrency)
    .map(([, id]) => id);

  const response = await axios.get<CryptocurrencyQuoteLatestResponse>(
    `${COINMARKETCAP_URL}/v2/cryptocurrency/quotes/latest`,
    {
      params: {
        id: ids.join(","),
        convert_id: idMap[quoteCurrency],
      },
      headers: { "X-CMC_PRO_API_KEY": Env.COINMARKETCAP_API_KEY },
    }
  );

  return ids.map((id) => {
    const price = response.data.data[id].quote[idMap[quoteCurrency]].price;
    const currency = response.data.data[id].symbol;
    return {
      currency,
      quoteCurrency,
      price,
    };
  });
};
