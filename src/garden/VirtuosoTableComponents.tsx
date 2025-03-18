import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { forwardRef } from 'react';
import { type TableComponents } from 'react-virtuoso';

import type { IData } from './types';

export const VirtuosoTableComponents: TableComponents<IData> = {
  // eslint-disable-next-line react/display-name
  Scroller: forwardRef<HTMLDivElement>((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
  // eslint-disable-next-line react/display-name
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />),
  TableHead,

  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />
};
