import {useMemo} from 'react';
import {CurrencyBalances} from '../config';
import {useExplorerStoreCurrencyBalancesHookSelector} from '../state';

export const useCurrencyBalances = (): CurrencyBalances => {
  const {currencies} = useExplorerStoreCurrencyBalancesHookSelector();
  const currencyBalances = useMemo(
    () =>
      currencies.reduce((prev, curr) => {
        return {...prev, [curr.currency]: curr.balance};
      }, {}),
    [currencies],
  );

  return currencyBalances;
};
