import type { FC } from 'react';

interface ICoinProps {
  amount: number;
}

export const Coin: FC<ICoinProps> = ({ amount }) => {
  return <>{Math.ceil(amount).toLocaleString()}</>;
};
