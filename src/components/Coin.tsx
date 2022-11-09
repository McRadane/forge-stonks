import { FC } from 'react';

export const Coin: FC<{ amount: number }> = ({ amount }) => {
  return <>{Math.ceil(amount).toLocaleString()}</>;
};
