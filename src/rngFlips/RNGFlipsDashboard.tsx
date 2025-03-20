import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMemo, type FC } from 'react';

import type { ILanguageItems, ILanguageUIRNGFlips } from '../resources/lang/type';
import {  rngFlips } from '../resources/rng';

import { RNGTable } from './RNGTable';
import type { IDataSourceItem } from './types';
import { useLanguage } from '../resources/lang/LanguageContext';

export interface IRNGFlipsDashboardProps {
  flips: Partial<Record<keyof ILanguageUIRNGFlips, Partial<Record<keyof ILanguageItems, IDataSourceItem>>>>;
}

export const RNGFlipsDashboard: FC<IRNGFlipsDashboardProps> = ({ flips }) => {
  const tables = useMemo(() => Object.keys(flips) as Array<keyof ILanguageUIRNGFlips>, [flips]);
  const { ui } = useLanguage();
  return (
    <>
      {tables.map((table, index) => {
        const dataSources = flips[table];
        const sourceItems = rngFlips[table];

        if (!dataSources) {
          return null;
        }
        return (
          <Accordion defaultExpanded={index === 0} key={table}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <Typography component="span" variant="h3">
                {ui.rngFlips[table]}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <RNGTable dataSource={dataSources} sourceItems={sourceItems} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};
