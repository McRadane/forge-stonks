import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { type CSSObject, styled, type Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';

import { ListItemButton } from '../components/ListItemButton';
import { useLanguage } from '../resources/lang/LanguageContext';

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
  overflowX: 'hidden',
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  },
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

interface IAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<IAppBarProps>(({ open, theme }) => ({
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
  const language = useLanguage();
  const { ui } = language;

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const location = useLocation();

  const findRoute = routes.find((route) => (location.pathname === '/' ? route.index : `/${route.path}` === location.pathname));

  const pageTitle = useMemo(() => {
    if (findRoute) {
      return ` - ${ui[findRoute.title] as string}`;
    }
    return '';
  }, [findRoute, ui]);

  return (
    <>
      <Helmet>
        <title>
          {ui.title}
          {pageTitle}
        </title>
      </Helmet>
      <AppBar open={open} position="fixed">
        <Toolbar>
          <IconButton
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' })
            }}
            aria-label="Open menu"
            color="inherit"
            edge="start"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
            {ui.title}
            {pageTitle}
          </Typography>
          <OptionDrawerButton name={findRoute?.option ?? null} />
        </Toolbar>
      </AppBar>
      <Drawer open={open} variant="permanent">
        <DrawerHeader>
          <IconButton aria-label="Close menu" onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((route) => {
            return (
              <ListItem key={route.path} sx={{ display: 'block' }} disablePadding>
                <ListItemButton
                  sx={{
                    justifyContent: open ? 'initial' : 'center',
                    minHeight: 48,
                    px: 2.5
                  }}
                  to={route.index ? '/' : `/${route.path}`}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: 'center',
                      minWidth: 0,
                      mr: open ? 3 : 'auto'
                    }}
                  >
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText primary={ui[route.title] as string} sx={{ opacity: open ? 1 : 0 }} />
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
