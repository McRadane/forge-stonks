import Paper from '@mui/material/Paper';
import { type Theme, useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import { type FC, type MouseEvent, useCallback, useMemo, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';

import { Coin } from '../components/Coin';
import { EnhancedTableRow, getComparator, type Order } from '../components/EnhancedTableHead';
import { useLanguage } from '../resources/lang/LanguageContext';
import type { ILanguage, ILanguageItems } from '../resources/lang/type';

import type { IData, IDataSourceItem } from './types';
import { VirtuosoTableComponents } from './VirtuosoTableComponents';

export interface IGardenProps {
  dataSource: Partial<Record<keyof ILanguageItems, IDataSourceItem>>;
  highlightItem: keyof ILanguageItems;
  labelRatio: string;
  sourceItems: Partial<Record<keyof ILanguageItems, number>>;
}

const fixedHeaderContent =
  ({
    handleRequestSort,
    labelRatio,
    lang,
    order,
    orderBy
  }: {
    handleRequestSort: (_event: MouseEvent<unknown>, property: string) => void;
    labelRatio: string;
    lang: ILanguage;
    order: Order;
    orderBy: string;
  }) =>
  // eslint-disable-next-line react/display-name
  () => {
    const heads = [
      { id: 'name', label: lang.ui.item, numeric: false },
      { id: 'price', label: lang.ui.itemPrice, numeric: true },
      { id: 'ratio', label: lang.ui.itemPricePerCompost, numeric: true },
      { id: 'value', label: labelRatio, numeric: true }
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

// eslint-disable-next-line react/display-name
const rowContent = (theme: Theme) => (_index: number, row: IData) => {
  const backgroundColor = row.highlight ? theme.palette.action.hover : undefined;
  return (
    <>
      <TableCell component="th" scope="row" sx={{ backgroundColor }}>
        {row.name}
      </TableCell>
      <TableCell align="right" sx={{ backgroundColor }}>
        <Coin amount={row.price} />
      </TableCell>
      <TableCell align="right" sx={{ backgroundColor }}>
        <Coin amount={row.ratio} />
      </TableCell>
      <TableCell align="right" sx={{ backgroundColor }}>
        <Coin amount={row.value} />
      </TableCell>
    </>
  );
};

export const GardenTable: FC<IGardenProps> = ({ dataSource, highlightItem, labelRatio, sourceItems }) => {
  const lang = useLanguage();
  const theme = useTheme();

  const [order, setOrder] = useState<Order>('asc');
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
    const preparedData: { highlight: boolean; id: string; name: string; price: number; ratio: number; value: number }[] = [];

    Object.keys(dataSource).forEach((key) => {
      const price = dataSource[key as keyof typeof dataSource];
      const name = lang.items[key as keyof ILanguageItems];

      preparedData.push({
        highlight: key === highlightItem,
        id: key,
        name,
        price: price?.price ?? 0,
        ratio: price?.ratio ?? 1,
        value: sourceItems[key as keyof typeof sourceItems] ?? 0
      });
    });

    return preparedData.filter((item) => item.price !== 0 && item.value !== 0).sort((a, b) => a.name.localeCompare(b.name));
  }, [dataSource, highlightItem, lang.items, sourceItems]);

  const sortedRows = useMemo(() => {
    return [...rows].sort(getComparator(order, orderBy));
  }, [order, orderBy, rows]);

  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        components={VirtuosoTableComponents}
        data={sortedRows}
        fixedHeaderContent={fixedHeaderContent({ handleRequestSort, labelRatio, lang, order, orderBy })}
        itemContent={rowContent(theme)}
      />
    </Paper>
  );
};
