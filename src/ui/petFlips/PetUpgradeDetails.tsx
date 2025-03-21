import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Chip, Dialog, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import { IPetPrices } from '@shared/types/worker';
import { Coin } from '@ui/components/Coin';
import { Rarity } from '@ui/components/Rarity';
import { FC } from 'react';

import { PetUpgradeDetailsRow } from './PetUpgradeDetailsRow';

export interface IPetUpgradeDetailsProps {
  basePrice: IPetPrices;
  lastPrice: IPetPrices;
  onClose: () => void;
  open: boolean;
  petPricesListForThisRarity: IPetPrices[];
  upgradeCost: number;
}

export const PetUpgradeDetails: FC<IPetUpgradeDetailsProps> = ({
  basePrice,
  lastPrice,
  onClose,
  open,
  petPricesListForThisRarity,
  upgradeCost
}) => {
  const { ui } = useLanguage();

  return (
    <Dialog fullWidth maxWidth={'md'} onClose={onClose} open={open}>
      <DialogTitle
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: 1
        }}
      >
        {ui.priceDetails} <Chip label={basePrice.petName} /> <Rarity rarity={basePrice.petBaseRarity} isColored /> <ArrowRightAltIcon />
        <Rarity rarity={lastPrice.petUpgradedRarity} isColored />
      </DialogTitle>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={30}></TableCell>
              <TableCell>{ui.operation}</TableCell>
              <TableCell align="right">{ui.price}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <PetUpgradeDetailsRow>
              <TableCell component="th" scope="row">
                {ui.buy} <Chip label={basePrice.petName} size="small" /> <Rarity rarity={basePrice.petBaseRarity} isColored small />
              </TableCell>
              <TableCell align="right">
                <Coin amount={basePrice.petBasePrice} />
              </TableCell>
            </PetUpgradeDetailsRow>
            {petPricesListForThisRarity.map((row) => (
              <PetUpgradeDetailsRow key={row.petUpgradedRarity} upgrade={row}>
                <TableCell component="th" scope="row">
                  {ui.upgradeFrom} <Rarity rarity={basePrice.petBaseRarity} isColored small /> {ui.upgradeTo}{' '}
                  <Rarity rarity={basePrice.petUpgradedRarity} isColored small />
                </TableCell>
                <TableCell align="right">
                  <Coin amount={row.petUpgradedCost} />
                </TableCell>
              </PetUpgradeDetailsRow>
            ))}
            <PetUpgradeDetailsRow>
              <TableCell component="th" scope="row">
                {ui.upgradeCost}
              </TableCell>
              <TableCell align="right">
                <Coin amount={upgradeCost} />
              </TableCell>
            </PetUpgradeDetailsRow>
            <PetUpgradeDetailsRow>
              <TableCell component="th" scope="row">
                {ui.sellPrice} <Chip label={basePrice.petName} size="small" />{' '}
                <Rarity rarity={lastPrice.petUpgradedRarity} isColored small />
              </TableCell>
              <TableCell align="right">
                <Coin amount={lastPrice.petUpgradedPrice} />
              </TableCell>
            </PetUpgradeDetailsRow>

            <PetUpgradeDetailsRow>
              <TableCell component="th" scope="row">
                {ui.profit}
              </TableCell>
              <TableCell align="right">
                <Coin amount={lastPrice.petUpgradedPrice - upgradeCost - basePrice.petBasePrice} />
              </TableCell>
            </PetUpgradeDetailsRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
};
