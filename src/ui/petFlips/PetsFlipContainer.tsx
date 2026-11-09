import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { pets } from '@shared/resources/pets';
import { type FC, useMemo } from 'react';

import { usePetPrice } from './hook';
import { PetTable } from './PetTable';

export const PetsFlipContainer: FC = () => {
  const allPets = usePetPrice();

  const tables = useMemo(() => {
    return pets.map((pet) => pet.name);
  }, []);

  return (
    <>
      {tables.map((table) => {
        const petsPrices = allPets.filter((pet) => pet.petName === table);
        const petDefinition = pets.find((pet) => pet.name === table);

        if (!petDefinition || petsPrices.length === 0) {
          return null;
        }
        return (
          <Accordion key={table}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <Typography component="span" variant="h4">
                {table}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <PetTable petDefinition={petDefinition} petsPrices={petsPrices} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};
