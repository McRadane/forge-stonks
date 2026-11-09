import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

interface IMainContainerProps {
  children: ReactNode;
}

export const MainContainer: FC<IMainContainerProps> = ({ children }) => {
  return (
    <Box component="main" sx={{ maxHeight: 'calc(100vh - 72px)', overflow: 'auto', width: '100%' }}>
      {children}
    </Box>
  );
};
