import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Theme, useTheme } from '@mui/material/styles';
import { FC, forwardRef, useMemo } from 'react';
import { TableComponents, TableVirtuoso } from 'react-virtuoso';

import { Coin } from '../components/Coin';
import { useLanguage } from '../resources/lang/LanguageContext';
import type { ILanguage, ILanguageItems } from '../resources/lang/type';

import type { IDataSourceItem } from './types';

interface IData {
  highlight: boolean;
  id: string;
  name: string;
  price: number;
  ratio: number;
  value: number;
}

export interface IGardenProps {
  dataSource: Partial<Record<keyof ILanguageItems, IDataSourceItem>>;
  highlightItem: keyof ILanguageItems;
  labelRatio: string;
  sourceItems: Partial<Record<keyof ILanguageItems, number>>;
}

const VirtuosoTableComponents: TableComponents<IData> = {
  // eslint-disable-next-line react/display-name
  Scroller: forwardRef<HTMLDivElement>((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  // eslint-disable-next-line react/display-name
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />),
  TableHead,
  Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
  // eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />
};

// eslint-disable-next-line react/display-name
const fixedHeaderContent = (labelRatio: string, lang: ILanguage) => () => {
  return (
    <TableRow
      sx={{
        backgroundColor: 'background.paper'
      }}
    >
      <TableCell>{lang.ui.item}</TableCell>
      <TableCell align="right">{lang.ui.itemPrice}</TableCell>
      <TableCell align="right">{lang.ui.itemPricePerCompost}</TableCell>
      <TableCell align="right">{labelRatio}</TableCell>
    </TableRow>
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

  const rows = useMemo(() => {
    const preparedData: { id: string; name: string; price: number; ratio: number; value: number; highlight: boolean }[] = [];

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

    preparedData.filter((item) => item.price !== 0 && item.value !== 0).sort((a, b) => a.name.localeCompare(b.name));

    return preparedData;
  }, [dataSource, highlightItem, lang.items, sourceItems]);

  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        components={VirtuosoTableComponents}
        data={rows}
        fixedHeaderContent={fixedHeaderContent(labelRatio, lang)}
        itemContent={rowContent(theme)}
      />
    </Paper>
  );
};
