import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import { type FC, ReactNode } from 'react';

import { OptionsSwitcherOptions } from './OptionsSwitcherOptions';

// import { PlayerSyncDialog } from './PlayerSyncDialog';

const WIDTH = 500;

interface IOptionsSwitcherProps {
  children?: ReactNode;
  open: boolean;
  toggle: () => void;
}

export const OptionsSwitcher: FC<IOptionsSwitcherProps> = ({ children, open, toggle }) => {
  const {
    ui: { options }
  } = useLanguage();

  // const [playerSyncOpen, setPlayerSyncOpen] = useState(false);

  // const playerSync = playerName !== undefined && playerProfile !== undefined;

  const theme = useTheme();

  return (
    <Drawer
      sx={{
        '& .MuiDrawer-paper': { width: WIDTH },
        width: WIDTH
      }}
      anchor={'right'}
      onClose={toggle}
      open={open}
    >
      <Box sx={{ /* width: 350, */ padding: 2, textAlign: 'left' }}>
        <Box sx={{ alignItems: 'self-start', display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="div" variant="h6" gutterBottom>
            {options.title}
          </Typography>
          <IconButton onClick={toggle} size="small" sx={{ height: theme.typography.fontSize }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List
          sx={{
            height: 'calc(100vh - 100px)',
            overflow: 'auto'
          }}
        >
          <OptionsSwitcherOptions />
          {children}
        </List>
      </Box>
    </Drawer>
  );
};
