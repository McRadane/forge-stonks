import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import type { ILanguageItems, ILanguageUIRNGFlips } from '@shared/resources/lang/type';
import { rngFlips } from '@shared/resources/rng';
import { type FC, useMemo } from 'react';

import { RNGTable } from './RNGTable';
import type { IDataSourceItem } from './types';

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
              <Typography component="span" variant="h4">
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
