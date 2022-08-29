import Joi from "joi";
import { CurrencyList } from "@stackupfinance/config";
import { bigNumber, ethereumAddress } from "./custom.validation";
import { ValidNetworks } from "../config";

export const quote = {
  query: Joi.object().keys({
    network: Joi.string()
      .valid(...ValidNetworks)
      .required(),
    baseCurrency: Joi.string()
      .valid(...CurrencyList)
      .required(),
    quoteCurrency: Joi.string()
      .valid(...CurrencyList)
      .required(),
    value: Joi.required().custom(bigNumber),
    address: Joi.required().custom(ethereumAddress),
  }),
};
