import { ethers } from "ethers";
import { CurrencySymbols } from "@stackupfinance/config";
import { Env } from "./env";

export type Networks = "Polygon";

type NetworksConfig = {
  currencies: Record<CurrencySymbols, { address: string; priceFeed: string }>;
};

export const ValidNetworks: Array<Networks> = ["Polygon"];

export const NetworksConfig: Record<Networks, NetworksConfig> = {
  Polygon: {
    currencies: {
      MATIC: {
        // Not currently supported
        address: ethers.constants.AddressZero,
        priceFeed: ethers.constants.AddressZero,
      },
      USDC: {
        address:
          Env.NETWORK_ENV === "mainnet"
            ? "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
            : "0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e",
        priceFeed:
          Env.NETWORK_ENV === "mainnet"
            ? "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0"
            : "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada",
      },
      ETH: {
        // Not currently supported
        address: ethers.constants.AddressZero,
        priceFeed: ethers.constants.AddressZero,
      },
      BTC: {
        // Not currently supported
        address: ethers.constants.AddressZero,
        priceFeed: ethers.constants.AddressZero,
      },
    },
  },
};
