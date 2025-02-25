/* eslint-disable sonarjs/no-duplicate-string */
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { type ChangeEvent, type FC, useCallback, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { LanguageContext, useLanguage } from '../resources/lang/LanguageContext';
import type { KeysLanguageType } from '../resources/lang/type';
import type { IOptionsState } from '../services/common';
import type { RootState } from '../store';
import { useWorker } from '../worker/WorkerContext';

interface IOptionsSwitcherProps {
  open: boolean;
  toggle: () => void;
}

export const OptionsSwitcher: FC<IOptionsSwitcherProps> = ({ open, toggle }) => {
  const {
    ui: { options }
  } = useLanguage();

  const { auctionsBINOnly, hotm, includeAuctionsFlip, includePerfectGems, intermediateCraft, maxCraftingCost, playFrequency, quickForge } =
    useSelector((state: RootState) => state.options);

  const { userLanguage } = useContext(LanguageContext);
  const worker = useWorker();
  const theme = useTheme();

  const handlPlayFrequency = useCallback(
    (event: SelectChangeEvent) => {
      const value = event.target.value as IOptionsState['playFrequency'];
      worker.setOption('playFrequency', value);
    },
    [worker]
  );

  const handleIncludeAuctionsFlip = useCallback(() => {
    worker.setOption('includeAuctionsFlip', !includeAuctionsFlip);
  }, [includeAuctionsFlip, worker]);

  const handleIncludePerfectGems = useCallback(() => {
    worker.setOption('includePerfectGems', !includePerfectGems);
  }, [includePerfectGems, worker]);

  const handleAuctionsBINOnly = useCallback(() => {
    worker.setOption('auctionsBINOnly', !auctionsBINOnly);
  }, [auctionsBINOnly, worker]);

  const handleIntermediateCraft = useCallback(() => {
    worker.setOption('intermediateCraft', !intermediateCraft);
  }, [intermediateCraft, worker]);

  const handleHOTMValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value === '' ? 0 : Number(event.target.value);

      worker.setOption('hotm', value);
    },
    [worker]
  );

  const handleLanguage = useCallback(
    (event: SelectChangeEvent) => {
      worker.setLanguage(event.target.value as KeysLanguageType);
    },
    [worker]
  );

  const handleMaxCraftingCost = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value === '' ? 0 : Number(event.target.value);
      worker.setOption('maxCraftingCost', value);
    },
    [worker]
  );

  const handleQuickForge = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value === '' ? 0 : Number(event.target.value);
      worker.setOption('quickForge', value);
    },
    [worker]
  );

  const quickForgeLevel = useMemo(() => {
    if (quickForge >= 2 && quickForge <= 10) {
      return 15;
    }

    if (quickForge >= 11 && quickForge <= 19) {
      return 19.5;
    }

    if (quickForge === 20) {
      return 30;
    }

    return 0;
  }, [quickForge]);

  return (
    <Drawer anchor={'right'} onClose={toggle} open={open}>
      <Box sx={{ /* width: 350, */ padding: 2, textAlign: 'left' }}>
        <Box sx={{ alignItems: 'self-start', display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="div" variant="h6" gutterBottom>
            {options.title}
          </Typography>
          <IconButton onClick={toggle} size="small" sx={{ height: theme.typography.fontSize }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List
          sx={{
            height: 'calc(100vh - 100px)',
            overflow: 'scroll'
          }}
        >
          <ListItem divider>
            <FormControl fullWidth variant="standard">
              <Typography id="playFrequency-label">{options.playFrequencyLabel}</Typography>
              <Select
                id="playFrequency"
                aria-describedby="playFrequency-description"
                aria-labelledby="playFrequency-label"
                label={options.playFrequencyLabel}
                onChange={handlPlayFrequency}
                value={playFrequency}
              >
                <MenuItem value={'nonstop'}>{options.playFrequencyOptionNonStop}</MenuItem>
                <MenuItem value={'three-time'}>{options.playFrequencyOptionThreeTime}</MenuItem>
                <MenuItem value={'twice'}>{options.playFrequencyOptionTwice}</MenuItem>
                <MenuItem value={'everyday'}>{options.playFrequencyOptionEveryday}</MenuItem>
                <MenuItem value={'less'}>{options.playFrequencyOptionLess}</MenuItem>
              </Select>
              <FormHelperText id="playFrequency-description">{options.playFrequencyDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth sx={{ alignItems: 'flex-start' }}>
              <Typography id="includeAuctionsFlip-label">{options.includeAuctionsFlipLabel}</Typography>
              <Switch
                id="includeAuctionsFlip"
                aria-describedby="includeAuctionsFlip-description"
                aria-labelledby="includeAuctionsFlip-label"
                checked={includeAuctionsFlip}
                onChange={handleIncludeAuctionsFlip}
              />
              <FormHelperText id="includeAuctionsFlip-description">{options.includeAuctionsFlipDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth sx={{ alignItems: 'flex-start' }}>
              <Typography id="includePerfectGems-label">{options.includePerfectGemsLabel}</Typography>
              <Switch
                id="includePerfectGems"
                aria-describedby="includePerfectGems-description"
                aria-labelledby="includePerfectGems-label"
                checked={includePerfectGems}
                onChange={handleIncludePerfectGems}
              />
              <FormHelperText id="includePerfectGems-description">{options.includePerfectGemsDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth sx={{ alignItems: 'flex-start' }}>
              <Typography id="auctionsBINOnly-label">{options.auctionsBINOnlyLabel}</Typography>
              <Switch
                id="auctionsBINOnly"
                aria-describedby="auctionsBINOnly-description"
                aria-labelledby="auctionsBINOnly-label"
                checked={auctionsBINOnly}
                onChange={handleAuctionsBINOnly}
              />
              <FormHelperText id="auctionsBINOnly-description">{options.auctionsBINOnlyDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth sx={{ alignItems: 'flex-start' }}>
              <Typography id="intermediateCraft-label">{options.intermediateCraftLabel}</Typography>
              <Switch
                id="intermediateCraft"
                aria-describedby="intermediateCraft-description"
                aria-labelledby="intermediateCraft-label"
                checked={intermediateCraft}
                onChange={handleIntermediateCraft}
              />
              <FormHelperText id="intermediateCraft-description">{options.intermediateCraftDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth variant="standard">
              <Typography id="hotm-label">{options.hotmLabel}</Typography>
              <Input
                id="hotm"
                inputProps={{
                  max: 10,
                  min: 2,
                  step: 1,
                  type: 'number'
                }}
                aria-describedby="hotm-description"
                aria-labelledby="hotm-label"
                onChange={handleHOTMValue}
                value={hotm}
              />

              <FormHelperText id="hotm-description">{options.hotmDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth variant="standard">
              <Typography id="language-label">{options.languageLabel}</Typography>
              <Select
                id="language"
                aria-describedby="language-description"
                aria-labelledby="language-label"
                onChange={handleLanguage}
                value={userLanguage}
              >
                <MenuItem value={'en-US'}>{options.languageOptionEnglish}</MenuItem>
                <MenuItem value={'fr-FR'}>{options.languageOptionFrench}</MenuItem>
              </Select>
              <FormHelperText id="language-description">{options.languageDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth variant="standard">
              <Typography id="maxCraftingCost-label">{options.maxCraftingCostLabel}</Typography>
              <Input
                id="maxCraftingCost"
                inputProps={{
                  'aria-labelledby': 'input-slider',
                  min: 0,
                  type: 'number'
                }}
                aria-describedby="maxCraftingCost-description"
                aria-labelledby="maxCraftingCost-label"
                onChange={handleMaxCraftingCost}
                value={maxCraftingCost ?? 0}
              />

              <FormHelperText id="maxCraftingCost-description">{options.maxCraftingCostDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth variant="standard">
              <Typography id="quickForge-label">{options.quickForgeLabel}</Typography>
              <Input
                id="quickForge"
                inputProps={{
                  max: 20,
                  min: 0,
                  step: 1,
                  type: 'number'
                }}
                aria-describedby="quickForge-description"
                aria-labelledby="quickForge-label"
                onChange={handleQuickForge}
                value={quickForge}
              />
              <FormHelperText id="quickForge-description">
                {options.quickForgeDescription}: {quickForgeLevel}%
              </FormHelperText>
            </FormControl>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
