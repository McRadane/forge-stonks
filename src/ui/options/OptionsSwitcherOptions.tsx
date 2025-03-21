import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { LanguageContext, useLanguage } from '@shared/resources/lang/LanguageContext';
import type { KeysLanguageType } from '@shared/resources/lang/type';
import { useAppSelector } from '@ui/store';
import { useWorker } from '@ui/worker/WorkerContext';
import { type FC, useCallback, useContext, useState } from 'react';

import { PlayerSyncDialog } from './PlayerSyncDialog';

export const OptionsSwitcherOptions: FC = () => {
  const {
    ui: { options }
  } = useLanguage();

  const { playerName, playerProfile } = useAppSelector((state) => state.options);
  const [playerSyncOpen, setPlayerSyncOpen] = useState(false);

  const playerSync = playerName !== undefined && playerProfile !== undefined;

  const { userLanguage } = useContext(LanguageContext);
  const worker = useWorker();
  const loading = useAppSelector((state) => state.worker.loading);

  const handleClickOpen = useCallback(() => {
    setPlayerSyncOpen(true);
  }, []);

  const handleClose = useCallback(
    (value?: { playerName: string; playerProfile: { id: string; name: string } }) => {
      setPlayerSyncOpen(false);
      if (value) {
        worker.setOption('playerName', value.playerName);
        worker.setOption('playerProfile', value.playerProfile);
      } else {
        worker.setOption('playerName', undefined);
        worker.setOption('playerProfile', undefined);
      }
    },
    [worker]
  );

  const handleForceRefresh = useCallback(() => {
    if (!loading) {
      worker.forceRefresh();
    }
  }, [loading, worker]);

  const handleLanguage = useCallback(
    (event: SelectChangeEvent) => {
      worker.setLanguage(event.target.value as KeysLanguageType);
    },
    [worker]
  );

  return (
    <>
      <ListItem divider>
        <Button disabled={loading} onClick={handleForceRefresh} variant="outlined">
          {options.forceRefresh}
        </Button>
      </ListItem>
      {playerSync && (
        <ListItem divider>
          <Typography id="syncProfile-label" variant="h6">
            {playerName} ({playerProfile.name})
          </Typography>
        </ListItem>
      )}
      <ListItem divider>
        <Button onClick={handleClickOpen} variant="outlined">
          {options.syncProfileTitle}
        </Button>
        <PlayerSyncDialog currentPlayerName={playerName} currentPlayerProfile={playerProfile} onClose={handleClose} open={playerSyncOpen} />
      </ListItem>
      <ListItem divider>
        <FormControl fullWidth variant="standard">
          <Typography id="language-label">{options.languageLabel}</Typography>
          <Select
            id="language"
            aria-describedby="language-description"
            aria-labelledby="language-label"
            onChange={handleLanguage}
            value={userLanguage}
          >
            <MenuItem value={'en-US'}>{options.languageOptionEnglish}</MenuItem>
            <MenuItem value={'fr-FR'}>{options.languageOptionFrench}</MenuItem>
          </Select>
          <FormHelperText id="language-description">{options.languageDescription}</FormHelperText>
        </FormControl>
      </ListItem>
    </>
  );
};
