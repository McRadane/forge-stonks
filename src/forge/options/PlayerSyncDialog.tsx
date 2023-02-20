import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useLanguage } from '../../resources/lang/LanguageContext';
import { getPlayerProfiles } from '../../worker/axios';

interface ISavedOptions {
  playerName: string;
  playerProfile: { id: string; name: string };
}

export interface IPlayerSyncDialogProps {
  currentPlayerName?: string;
  currentPlayerProfile?: { id: string; name: string };
  open: boolean;
  onClose: (props?: ISavedOptions) => void;
}

export const PlayerSyncDialog = (props: IPlayerSyncDialogProps) => {
  const { currentPlayerName, currentPlayerProfile, onClose, open } = props;
  const [playerName, setPlayerName] = useState(currentPlayerName ?? '');
  const [playerProfile, setPlayerProfile] = useState(currentPlayerProfile);
  const [playerProfileOptions, setPlayerProfileOptions] = useState<{ id: string; name: string }[]>([]);

  const lang = useLanguage();

  useEffect(() => {
    if (currentPlayerName !== undefined) {
      getPlayerProfiles(currentPlayerName)
        .then((response) => {
          setPlayerProfileOptions(response ?? []);
        })
        .catch(() => {
          setPlayerProfileOptions([]);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPlayerNameBlur = useCallback(() => {
    getPlayerProfiles(playerName)
      .then((response) => {
        setPlayerProfileOptions(response ?? []);
      })
      .catch(() => {
        setPlayerProfileOptions([]);
      });
  }, [playerName]);

  const onPlayerNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  }, []);

  const onProfileChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const findPlayerProfile = playerProfileOptions.find((option) => option.id === event.target.value);
      setPlayerProfile(findPlayerProfile);
    },
    [playerProfileOptions]
  );

  /* const handleClose = useCallback(() => {
    if (savedOptions !== undefined) {
      onClose(savedOptions);
    } else {
      onClose();
    }
  }, [onClose, savedOptions]);*/

  const handleSave = useCallback(() => {
    if (playerName !== '' && playerProfile !== undefined) {
      onClose({ playerName, playerProfile });
    } else {
      onClose();
    }
  }, [onClose, playerName, playerProfile]);

  const handleCancel = useCallback(() => {
    if (currentPlayerName !== undefined && currentPlayerName !== '' && currentPlayerProfile !== undefined) {
      onClose({ playerName: currentPlayerName, playerProfile: currentPlayerProfile });
    } else {
      onClose();
    }
  }, [currentPlayerName, currentPlayerProfile, onClose]);
  const handleDelete = useCallback(() => {
    onClose();
  }, [onClose]);

  const hasPlayerSelected = useMemo(() => playerName && playerName !== '' && playerProfile !== undefined, [playerName, playerProfile]);

  const hasPlayerReady = useMemo(
    () => playerName && playerName !== '' && playerProfileOptions.length > 0,
    [playerName, playerProfileOptions.length]
  );

  return (
    <Dialog onClose={handleCancel} open={open}>
      <DialogTitle>{lang.ui.options.syncProfileTitle}</DialogTitle>
      <DialogContent>
        {hasPlayerSelected && (
          <DialogContentText>
            {playerName} ({playerProfile?.name})
          </DialogContentText>
        )}
        <TextField
          fullWidth
          id="player-name"
          label={lang.ui.options.playerName}
          onBlur={onPlayerNameBlur}
          onChange={onPlayerNameChange}
          value={playerName}
          variant="standard"
        />
        <FormControl fullWidth>
          <InputLabel id="player-profile-label" variant="standard">
            {lang.ui.options.playerProfile}
          </InputLabel>
          <Select
            disabled={!hasPlayerReady}
            id="player-profile"
            label={lang.ui.options.playerProfile}
            labelId="player-profile-label"
            onChange={onProfileChange}
            value={playerProfile?.id}
            variant="standard"
          >
            {playerProfileOptions.map((profile) => (
              <MenuItem key={profile.id} value={profile.id}>
                {profile.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button endIcon={<SaveIcon />} onClick={handleSave} variant="contained">
          {lang.ui.options.save}
        </Button>
        <Button endIcon={<CancelIcon />} onClick={handleCancel} variant="outlined">
          {lang.ui.options.cancel}
        </Button>
        <Button onClick={handleDelete} startIcon={<DeleteIcon />} variant="outlined">
          {lang.ui.options.delete}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
