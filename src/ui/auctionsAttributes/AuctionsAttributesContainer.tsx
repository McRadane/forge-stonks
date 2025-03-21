import { Box } from '@mui/material';
import { attributes, itemsWithAttributes } from '@shared/resources/attributes';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import { IAuctionAttributes } from '@shared/types/requests';
import { MultiSelect } from '@ui/components/MultiSelect';
import { RangeSlider } from '@ui/components/RangeSlider';
import { Select } from '@ui/components/Select';
import { ToggleButtons } from '@ui/components/TobbleButtons';
import { FC, useMemo, useState } from 'react';

import { auctionTypes } from './consts';
import { GridItems } from './GridItems';

export interface IAuctionAttributesContainerProps {
  auctions: IAuctionAttributes[];
}

export const AuctionsAttributesContainer: FC<IAuctionAttributesContainerProps> = ({ auctions }) => {
  const { ui } = useLanguage();
  const [filterItem, setFilterItem] = useState<string>();
  const [filterAttribute, setFilterAttribute] = useState<string[]>();
  const [filterLevels, setFilterLevels] = useState<[number, number]>([1, 10]);
  const [filterType, setFilterType] = useState('BIN');

  const auctionTypesLocalized = useMemo(
    () => auctionTypes.map((type) => ({ text: ui[type.text], value: type.value }) as { text: string; value: string }),
    [ui]
  );

  const handleFilterLevelsChange = (newValue: number | number[]) => {
    const newNumbers = newValue as [number, number];

    setFilterLevels([newNumbers[0], newNumbers[1]]);
  };

  const filteredAuctions = useMemo(() => {
    let filtered = [...auctions];

    if (filterItem) {
      filtered = filtered.filter((auction) => auction.itemName === filterItem);
    }

    if (filterAttribute) {
      filterAttribute.forEach((attribute) => {
        filtered = filtered.filter((auction) => auction.attributes[attribute]);
        if (filterLevels[0] !== 1 || filterLevels[1] !== 10) {
          filtered = filtered.filter(
            (auction) => auction.attributes[attribute] >= filterLevels[0] && auction.attributes[attribute] <= filterLevels[1]
          );
        }
      });
    }

    if (filterType) {
      filtered = filtered.filter((auction) => auction.bin === (filterType === 'BIN'));
    }

    return filtered.sort((a, b) => a.startingBid - b.startingBid);
  }, [auctions, filterItem, filterAttribute, filterType, filterLevels]);

  return (
    <>
      <Box
        sx={{
          alignItems: 'center',
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(4, auto)',
          padding: 1
        }}
      >
        <Select label={ui.items} onChange={setFilterItem} values={itemsWithAttributes} />
        <MultiSelect label={ui.attributes} maxItems={2} onChange={setFilterAttribute} values={attributes} />

        <RangeSlider label={ui.levels} max={10} min={1} onChange={handleFilterLevelsChange} />
        <ToggleButtons defaultOption={filterType} label={ui.type} onChange={setFilterType} options={auctionTypesLocalized} />
      </Box>
      <GridItems items={filteredAuctions} />
    </>
  );
};
