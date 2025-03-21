import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import ListItem from '@mui/material/ListItem';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import { useAppSelector } from '@ui/store';
import { useWorker } from '@ui/worker/WorkerContext';
import { type FC, useCallback } from 'react';

export const BinsOnlyOptionsSwitcher: FC = () => {
  const {
    ui: { options }
  } = useLanguage();

  const { auctionsBINOnly } = useAppSelector((state) => state.options);

  const worker = useWorker();

  const handleAuctionsBINOnly = useCallback(() => {
    worker.setOption('auctionsBINOnly', !auctionsBINOnly);
  }, [auctionsBINOnly, worker]);

  return (
    <ListItem divider>
      <FormControl fullWidth sx={{ alignItems: 'flex-start' }}>
        <Typography id="auctionsBINOnly-label">{options.auctionsBINOnlyLabel}</Typography>
        <Switch
          id="auctionsBINOnly"
          aria-describedby="auctionsBINOnly-description"
          aria-labelledby="auctionsBINOnly-label"
          checked={auctionsBINOnly}
          onChange={handleAuctionsBINOnly}
        />
        <FormHelperText id="auctionsBINOnly-description">{options.auctionsBINOnlyDescription}</FormHelperText>
      </FormControl>
    </ListItem>
  );
};
