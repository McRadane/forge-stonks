import type { FC } from 'react';

interface ICoinProps {
  amount: number;
}

export const Coin: FC<ICoinProps> = ({ amount }) => {
  if (Number.isNaN(amount)) {
    return <>-</>;
  }

  return <>{Math.ceil(amount).toLocaleString()}</>;
};
