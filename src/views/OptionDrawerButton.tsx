import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import type { FC } from 'react';

import { useDrawerSetStatus } from '../components/DrawerProvider';

const OptionDrawerButtonInternal: FC<{ name: string }> = ({ name }) => {
  const { toggle } = useDrawerSetStatus(name);

  return (
    <Button aria-label="Show options" color="inherit" onClick={toggle}>
      <SettingsIcon />
    </Button>
  );
};

export const OptionDrawerButton: FC<{ name: null | string }> = ({ name }) => {
  if (name === null) {
    return <></>;
  }

  return <OptionDrawerButtonInternal name={name} />;
};
