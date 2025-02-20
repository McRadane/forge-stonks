import { render } from '@testing-library/react';
import { expect, describe, test } from 'vitest';

import { Coin } from './Coin';
import { Item } from './Item';

describe('Components tests', () => {
  describe('Coins', () => {
    test('with amount of 0', async () => {
      const { container } = render(<Coin amount={0} />);

      expect(container).toHaveTextContent('0');
    });

    test('with amount of 42', async () => {
      const { container } = render(<Coin amount={42} />);

      expect(container).toHaveTextContent('42');
    });

    test('with amount of 3.14', async () => {
      const { container } = render(<Coin amount={3.14} />);

      expect(container).toHaveTextContent('4');
    });
  });

  describe('Item', () => {
    test('with existing item', async () => {
      const { container } = render(<Item>ENCHANTED_REDSTONE_BLOCK</Item>);

      expect(container).toHaveTextContent('Enchanted Redstone Block');
    });

    test('with invalid item', async () => {
      const { container } = render(<Item>INVALID</Item>);

      expect(container).toHaveTextContent('INVALID');
    });
  });
});
