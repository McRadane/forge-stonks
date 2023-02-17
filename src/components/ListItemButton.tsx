import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import MUIListItemButton from '@mui/material/ListItemButton';
import { forwardRef, useMemo } from 'react';
import { Link, LinkProps, To, useLocation, useResolvedPath } from 'react-router-dom';

interface ILinkRouterProps extends ButtonBaseProps {
  children: React.ReactNode;
  to?: To;
}

const useActive = (to: To): boolean => {
  const location = useLocation();
  const path = useResolvedPath(to);
  let locationPathname = location.pathname;
  let toPathname = path.pathname;

  locationPathname = locationPathname.toLowerCase();
  toPathname = toPathname.toLowerCase();

  return locationPathname === toPathname || (locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === '/');
};

export const ListItemButton = ({ children, to, ...other }: ILinkRouterProps) => {
  const active = useActive(to ?? '#');

  const CustomLink = useMemo(
    () =>
      // eslint-disable-next-line react/no-unstable-nested-components
      forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(function Link2(linkProps, ref) {
        return <Link ref={ref} to={to as To} {...linkProps} />;
      }),
    [to]
  );

  if (!to) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <MUIListItemButton {...(other as any)}>{children}</MUIListItemButton>
    );
  }
  return (
    <MUIListItemButton
      component={CustomLink}
      selected={active}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(other as any)}
    >
      {children}
    </MUIListItemButton>
  );
};
