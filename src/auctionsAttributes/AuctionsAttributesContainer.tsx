import { AppBar, Box, LinearProgress, Toolbar, Typography } from '@mui/material';
import { RangeSlider } from '../components/RangeSlider';
import { Select } from '../components/Select';
import { GridItems } from './GridItems';
import { IAuctionAttributes } from '../requests/types';
import { FC } from 'react';

export interface IAuctionAttributesContainerProps {
    auctions: IAuctionAttributes[]
}

export const AuctionsAttributesContainer: FC<IAuctionAttributesContainerProps> = ({auctions}) => {
  return (
    <Box sx={{ display: 'flex', paddingTop: '64px' }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
            Auction Attribute Search
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ width: '100%' }}>
        <Box sx={{ height: 8 }}>{loading && <LinearProgress />}</Box>
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            // justifyContent: "space-between",
            gridTemplateColumns: 'auto auto auto',
            padding: 1
          }}
        >
          <Select label="Items" onChange={setFilterItem} values={items} allowEmpty />
          <Select label="Attributes" onChange={setFilterAttribute} values={attributes} allowEmpty />

          <RangeSlider label="Levels" max={10} min={1} onChange={handleFilterLevelsChange} />
        </Box>
        {/*<Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
                gap: 2,
              }}
            >*/}
        <GridItems items={filteredAuctions} />
      </Box>
    </Box>
  );
};
