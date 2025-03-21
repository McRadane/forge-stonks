import { IAuctionAttributes } from '@shared/types/requests';
import React, { FC } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid, FixedSizeGridProps } from 'react-window';

import { CARD_HEIGHT, CARD_WIDTH } from './consts';
import { ItemWithAttributes } from './ItemWithAttributes';

import './GridItems.css';

// Fix for react-window types not exporting the correct type
const Grid = FixedSizeGrid as unknown as FC<FixedSizeGridProps>;

const Cell: FC<{
  columnIndex: number;
  data: { columnCount: number; items: IAuctionAttributes[] };
  rowIndex: number;
  style: React.CSSProperties;
}> = ({ columnIndex, data, rowIndex, style }) => {
  const { columnCount, items } = data;
  const singleColumnIndex = columnIndex + rowIndex * columnCount;
  const card = items[singleColumnIndex];
  return (
    <div style={style}>
      {card && (
        <div
          style={{
            display: 'inline-block',
            height: CARD_HEIGHT,
            width: CARD_WIDTH
          }}
          key={card.uuid}
        >
          <ItemWithAttributes auction={card} />
        </div>
      )}
    </div>
  );
};

export const GridItems: FC<{ items: IAuctionAttributes[] }> = ({ items }) => (
  <div
    style={{
      // backgroundColor: '#d6cae2',
      marginTop: '2em',
      minHeight: 'calc(100vh - 200px)',
      position: 'sticky',
      top: '0px'
    }}
  >
    <AutoSizer>
      {({ height, width }) => {
        const cardWidth = CARD_WIDTH;
        const cardHeight = CARD_HEIGHT;
        const columnCount = Math.floor(width / cardWidth);
        const rowCount = Math.ceil(items.length / columnCount);
        return (
          <Grid
            columnWidth={cardWidth}
            width={width}
            className="grid"
            columnCount={columnCount}
            height={height}
            itemData={{ columnCount, items }}
            rowCount={rowCount}
            rowHeight={cardHeight}
          >
            {Cell}
          </Grid>
        );
      }}
    </AutoSizer>
  </div>
);
