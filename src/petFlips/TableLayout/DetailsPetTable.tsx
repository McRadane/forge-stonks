import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { type FC } from 'react';

import { Coin } from '../../components/Coin';
import { useLanguage } from '../../resources/lang/LanguageContext';
import { IPetPrices } from '../../worker/type';

import { DetailsPetRow } from './DetailsPetRow';

interface IDetailsPetTableProps {
  pet: IPetPrices;
}

export const DetailsPetTable: FC<IDetailsPetTableProps> = ({ pet }) => {
  const { ui } = useLanguage();
  const { coins, material, upgradeTime } = pet;

  return (
    <Box sx={{ margin: 1 }}>
      <Typography component="div" variant="h6" gutterBottom>
        {ui.shoppingList}
      </Typography>
      <Typography component="div" variant="h6" gutterBottom>
        Base price : <Coin amount={coins} />
      </Typography>
      <Typography component="div" variant="h6" gutterBottom>
        Time : {upgradeTime < 0.5 ? 0 : upgradeTime}
      </Typography>
      <Table aria-label={ui.shoppingList} size="small">
        <TableHead>
          <TableRow>
            <TableCell>{ui.item}</TableCell>
            <TableCell align="right">{ui.itemPrice}</TableCell>
            <TableCell align="right">{ui.amount}</TableCell>
            <TableCell align="right">{ui.totalPrice}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {material.map((mat) => (
            <DetailsPetRow key={mat.itemId} material={mat} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
