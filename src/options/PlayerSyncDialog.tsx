import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useState } from 'react';

import { getPlayerProfiles } from '../worker/axios';

export interface IPlayerSyncDialogProps {
  currentPlayerName?: string;
  currentPlayerProfile?: { id: string; name: string };
  open: boolean;
  onClose: (props?: { playerName: string; playerProfile: { id: string; name: string } }) => void;
}

export const PlayerSyncDialog = (props: IPlayerSyncDialogProps) => {
  const { currentPlayerName, currentPlayerProfile, onClose, open } = props;
  const [playerName, setPlayerName] = useState(currentPlayerName ?? '');
  const [playerProfile, setPlayerProfile] = useState(currentPlayerProfile);
  const [playerProfileOptions, setPlayerProfileOptions] = useState<{ id: string; name: string }[]>([]);

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

  const handleClose = useCallback(() => {
    if (playerName !== '' && playerProfile !== undefined) {
      onClose({ playerName, playerProfile });
    } else {
      onClose();
    }
  }, [onClose, playerName, playerProfile]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Sync profile</DialogTitle>
      <TextField id="player-name" label="Player Name" onBlur={onPlayerNameBlur} onChange={onPlayerNameChange} value={playerName} />
      <FormControl fullWidth>
        <InputLabel id="player-profile-label">Player Profile</InputLabel>
        <Select
          disabled={playerName === '' || playerProfileOptions.length === 0}
          id="player-profile"
          label="Player Profile"
          labelId="player-profile-label"
          onChange={onProfileChange}
          value={playerProfile?.id}
        >
          {playerProfileOptions.map((profile) => (
            <MenuItem key={profile.id} value={profile.id}>
              {profile.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Dialog>
  );
};
