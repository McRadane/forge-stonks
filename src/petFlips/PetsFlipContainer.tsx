import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { type FC, useMemo } from 'react';

import { pets } from '../resources/pets';

// import { CraftsList } from './ListLayout/CraftsList';
import { PetTable } from './PetTable';

export const PetsFlipContainer: FC = () => {
  // const allPets = usePetPrice();

  // const theme = useTheme();

  const tables = useMemo(() => {
    return pets.map((pet) => pet.name);
  }, [])

  console.log({tables})

  return (
    <>
      {tables.map((table) => {
        // const petsPrices = allPets.filter((pet) => pet.petName === table);
        const petDefinition = pets.find((pet) => pet.name === table);

        if (!petDefinition) {
          return null;
        }
        return (
          <Accordion key={table}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <Typography component="span" variant="h3">
                {table}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <PetTable petDefinition={petDefinition} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );

  // return <PetsTable pets={filteredPets} />;
};
