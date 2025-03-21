import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import { useDrawerSetStatus } from '@ui/components/DrawerProvider';
import type { FC } from 'react';

const OptionDrawerButtonInternal: FC<{ name: string }> = ({ name }) => {
  const { toggle } = useDrawerSetStatus(name);

  return (
    <Button aria-label="Show options" color="inherit" onClick={toggle}>
      <SettingsIcon />
    </Button>
  );
};

export const OptionDrawerButton: FC<{ name?: string }> = ({ name }) => {
  if (name === undefined) {
    return <></>;
  }

  return <OptionDrawerButtonInternal name={name} />;
};
