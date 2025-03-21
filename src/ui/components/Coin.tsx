import type { FC } from 'react';

interface ICoinProps {
  amount: number;
  noNumberText?: string;
}

export const Coin: FC<ICoinProps> = ({ amount, noNumberText }) => {
  if (Number.isNaN(amount)) {
    return <>{noNumberText ?? '-'}</>;
  }

  return <>{Math.ceil(amount).toLocaleString()}</>;
};
