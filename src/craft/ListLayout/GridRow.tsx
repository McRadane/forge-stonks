import Grid from '@mui/material/Grid2';
import { type Theme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';

const getStyles = (theme: Theme) => ({
  left: {
    [theme.breakpoints.down('sm')]: {
      fontWeight: 'bold'
    },
    [theme.breakpoints.up('sm')]: {
      borderBottom: '1px solid black'
    }
  },
  right: {
    borderBottom: '1px solid black',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right'
    }
  }
});

interface IGridRowProps {
  left: ReactNode;
  right: ReactNode;
}

export const GridRow: FC<IGridRowProps> = ({ left, right }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <>
      <Grid size={{ sm: 6, xs: 12 }}>
        <Typography sx={styles.left}>{left}</Typography>
      </Grid>
      <Grid size={{ sm: 6, xs: 12 }}>
        <Typography sx={styles.right}>{right}</Typography>
      </Grid>
    </>
  );
};
