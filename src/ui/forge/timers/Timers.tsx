import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import { useAppSelector } from '@ui/store';

import { Timer } from './Timer';

export const Timers = () => {
  const timers = useAppSelector((state) => state.forge.timers);
  const theme = useTheme();
  const { ui } = useLanguage();

  const matches = useMediaQuery(theme.breakpoints.down('md'));

  if (timers.length === 0) {
    return <></>;
  }

  if (matches) {
    return (
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" expandIcon={<ExpandMoreIcon />}>
          <Typography>
            {ui.timer} ({timers.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={'column'} spacing={1}>
            {timers.map((timer) => (
              <Timer key={timer.id} {...timer} />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Stack direction={'row'} spacing={1}>
      {timers.map((timer) => (
        <Timer key={timer.id} {...timer} />
      ))}
    </Stack>
  );
};
