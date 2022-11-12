import Grid from '@mui/material/Grid';
import { Theme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FC, ReactNode } from 'react';

const getStyles = (theme: Theme) => ({
  left: {
    [theme.breakpoints.down('sm')]: {
      fontWeight: 'bold'
    }
  },
  right: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right'
    }
  }
});

export const GridRow: FC<{ left: ReactNode; right: ReactNode }> = ({ left, right }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography sx={styles.left}>{left}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography sx={styles.right}>{right}</Typography>
      </Grid>
    </>
  );
};
