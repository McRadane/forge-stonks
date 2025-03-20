import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import { type FC, type MouseEvent, useCallback, useMemo, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';

import { Coin } from '../components/Coin';
import { EnhancedTableRow, getComparator, type Order } from '../components/EnhancedTableHead';
import { useLanguage } from '../resources/lang/LanguageContext';
import type { ILanguage, ILanguageItems } from '../resources/lang/type';

import type { IData, IDataSourceItem } from './types';
import { VirtuosoTableComponents } from './VirtuosoTableComponents';

export interface IRNGTableProps {
  dataSource: Partial<Record<keyof ILanguageItems, IDataSourceItem>>;
  sourceItems: Partial<Record<keyof ILanguageItems, number>>;
}

const fixedHeaderContent =
  ({
    handleRequestSort,
    lang,
    order,
    orderBy
  }: {
    handleRequestSort: (_event: MouseEvent<unknown>, property: string) => void;

    lang: ILanguage;
    order: Order;
    orderBy: string;
  }) =>
  () => {
    const heads = [
      { id: 'name', label: lang.ui.item, numeric: false },
      { id: 'price', label: lang.ui.itemPrice, numeric: true },
      { id: 'ratio', label: lang.ui.itemPricePerXP, numeric: true },
      { id: 'value', label: lang.ui.neededXP, numeric: true }
    ];

    return (
      <EnhancedTableRow
        backgroundColor="background.paper"
        headCells={heads}
        onRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
      />
    );
  };

const rowContent = (_index: number, row: IData) => {
  return (
    <>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">
        <Coin amount={row.price} />
      </TableCell>
      <TableCell align="right">
        <Coin amount={row.ratio} />
      </TableCell>
      <TableCell align="right">
        <Coin amount={row.value} />
      </TableCell>
    </>
  );
};

export const RNGTable: FC<IRNGTableProps> = ({ dataSource, sourceItems }) => {
  const lang = useLanguage();

  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<string>('ratio');

  const handleRequestSort = useCallback(
    (_event: MouseEvent<unknown>, property: string) => {
      if (orderBy === property) {
        setOrder(order === 'asc' ? 'desc' : 'asc');
      } else {
        setOrder('asc');
        setOrderBy(property);
      }
    },
    [order, orderBy]
  );

  const rows = useMemo(() => {
    const preparedData: { id: string; name: string; price: number; ratio: number; value: number }[] = [];

    Object.keys(dataSource).forEach((key) => {
      const price = dataSource[key as keyof typeof dataSource];
      const name = lang.items[key as keyof ILanguageItems];

      preparedData.push({
        id: key,
        name,
        price: price?.price ?? 0,
        ratio: price?.ratio ?? 1,
        value: sourceItems[key as keyof typeof sourceItems] ?? 0
      });
    });

    return preparedData.filter((item) => item.price !== 0 && item.value !== 0).sort((a, b) => a.name.localeCompare(b.name));
  }, [dataSource, lang.items, sourceItems]);

  const sortedRows = useMemo(() => {
    return [...rows].sort(getComparator(order, orderBy));
  }, [order, orderBy, rows]);

  return (
    <Paper style={{ height: 600, width: '100%' }}>
      <TableVirtuoso
        components={VirtuosoTableComponents}
        data={sortedRows}
        fixedHeaderContent={fixedHeaderContent({ handleRequestSort, lang, order, orderBy })}
        itemContent={rowContent}
      />
    </Paper>
  );
};
