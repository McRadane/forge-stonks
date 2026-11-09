import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import { IPetCraftMaterial } from '@shared/types/worker';
import { Coin } from '@ui/components/Coin';
import { FC, ReactNode, useCallback, useState } from 'react';

import { PetUpgradeDetailsMaterialRow } from './PetUpgradeDetailsMaterialRow';

export interface IPetUpgradeDetailsRowProps {
  children: ReactNode;
  upgrade?: {
    coins: number;
    material: IPetCraftMaterial[];
  };
}

export const PetUpgradeDetailsRow: FC<IPetUpgradeDetailsRowProps> = ({ children, upgrade }) => {
  const [open, setOpen] = useState(false);

  const { items, ui } = useLanguage();

  const onClick = useCallback(() => setOpen((status) => !status), []);

  if (!upgrade) {
    return (
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell />
        {children}
      </TableRow>
    );
  }

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          <IconButton aria-label="expand row" onClick={onClick} size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      <TableRow>
        <TableCell colSpan={3} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography component="div" variant="h6" gutterBottom>
                {ui.materialList}
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{ui.item}</TableCell>
                    <TableCell>{ui.amount}</TableCell>
                    <TableCell align="right">{ui.itemPrice}</TableCell>
                    <TableCell align="right">{ui.totalPrice}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{items.coins}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">
                    <Coin amount={upgrade.coins} />
                  </TableCell>
                  {upgrade.material.map((material) => (
                    <PetUpgradeDetailsMaterialRow key={material.itemId} material={material} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
