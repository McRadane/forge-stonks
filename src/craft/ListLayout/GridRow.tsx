import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';
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
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right'
    },
    borderBottom: '1px solid black'
  }
});

export const GridRow: FC<{ left: ReactNode; right: ReactNode }> = ({ left, right }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <>
      <Grid item sm={6} xs={12}>
        <Typography sx={styles.left}>{left}</Typography>
      </Grid>
      <Grid item sm={6} xs={12}>
        <Typography sx={styles.right}>{right}</Typography>
      </Grid>
    </>
  );
};
