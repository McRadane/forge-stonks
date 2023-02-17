import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles';
import { useCallback, useContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { ListItemButton } from '../components/ListItemButton';
import { LanguageContext } from '../resources/lang/LanguageContext';

import { OptionDrawerButton } from './OptionDrawerButton';
import { routes } from './routes';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.sharp
  }),
  width: drawerWidth
});

const closedMixin = (theme: Theme): CSSObject => ({
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  },
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp
  }),
  width: `calc(${theme.spacing(7)} + 1px)`
});

const DrawerHeader = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ open, theme }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp
  }),
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp
    }),
    width: `calc(100% - ${drawerWidth}px)`
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ open, theme }) => ({
  boxSizing: 'border-box',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  width: drawerWidth,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

export const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const languageContext = useContext(LanguageContext);
  const {
    dictionary: {
      ui: { title }
    }
  } = languageContext;

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const location = useLocation();

  const findRoute = routes.find((route) => (location.pathname === '/' ? route.index : `/${route.path}` === location.pathname));

  return (
    <>
      <AppBar open={open} position="fixed">
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            color="inherit"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
            {title}
          </Typography>
          <OptionDrawerButton name={findRoute?.option ?? null} />
        </Toolbar>
      </AppBar>
      <Drawer open={open} variant="permanent">
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((route) => {
            return (
              <ListItem disablePadding key={route.path} sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5
                  }}
                  to={route.index ? '/' : `/${route.path}`}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText primary={route.title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Outlet />
    </>
  );
};
