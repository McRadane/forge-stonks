/* eslint-disable sonarjs/no-duplicate-string */
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { FC, useCallback, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { LanguageContext, useLanguage } from '../resources/lang/LanguageContext';
import { KeysLanguageType } from '../resources/lang/type';
import { IOptionsState } from '../services/options';
import { RootState } from '../store';
import { useWorker } from '../worker/WorkerContext';

export const OptionsSwitcher: FC<{ open: boolean; toggle: () => void }> = ({ open, toggle }) => {
  const {
    ui: { options }
  } = useLanguage();

  const { auctionsBINOnly, hotm, includeAuctionsFlip, intermediateCraft, maxCraftingCost, playFrequency, quickForge } = useSelector(
    (state: RootState) => state.options
  );
  const { userLanguage } = useContext(LanguageContext);
  const worker = useWorker();

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

  const handleAuctionsBINOnly = useCallback(() => {
    worker.setOption('auctionsBINOnly', !auctionsBINOnly);
  }, [auctionsBINOnly, worker]);

  const handleIntermediateCraft = useCallback(() => {
    worker.setOption('intermediateCraft', !intermediateCraft);
  }, [intermediateCraft, worker]);

  const handleHOTMValue = useCallback(
    (_e: Event, num: number | number[]) => {
      const value = Array.isArray(num) ? num[0] : num;

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
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value === '' ? 0 : Number(event.target.value);
      worker.setOption('maxCraftingCost', value);
    },
    [worker]
  );

  const handleQuickForge = useCallback(
    (_e: Event, num: number | number[]) => {
      const value = Array.isArray(num) ? num[0] : num;
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
      <Box role="presentation" sx={{ /* width: 350, */ padding: 2, textAlign: 'left' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'self-start' }}>
          <Typography component="div" gutterBottom variant="h6">
            {options.title}
          </Typography>
          <IconButton onClick={toggle} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem divider>
            <FormControl fullWidth variant="standard">
              <Typography id="playFrequency-label">{options.playFrequencyLabel}</Typography>
              <Select
                aria-describedby="playFrequency-description"
                aria-labelledby="playFrequency-label"
                id="playFrequency"
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
                aria-describedby="includeAuctionsFlip-description"
                aria-labelledby="includeAuctionsFlip-label"
                checked={includeAuctionsFlip}
                id="includeAuctionsFlip"
                onChange={handleIncludeAuctionsFlip}
              />
              <FormHelperText id="includeAuctionsFlip-description">{options.includeAuctionsFlipDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth sx={{ alignItems: 'flex-start' }}>
              <Typography id="auctionsBINOnly-label">{options.auctionsBINOnlyLabel}</Typography>
              <Switch
                aria-describedby="auctionsBINOnly-description"
                aria-labelledby="auctionsBINOnly-label"
                checked={auctionsBINOnly}
                id="auctionsBINOnly"
                onChange={handleAuctionsBINOnly}
              />
              <FormHelperText id="auctionsBINOnly-description">{options.auctionsBINOnlyDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth sx={{ alignItems: 'flex-start' }}>
              <Typography id="intermediateCraft-label">{options.intermediateCraftLabel}</Typography>
              <Switch
                aria-describedby="intermediateCraft-description"
                aria-labelledby="intermediateCraft-label"
                checked={intermediateCraft}
                id="intermediateCraft"
                onChange={handleIntermediateCraft}
              />
              <FormHelperText id="intermediateCraft-description">{options.intermediateCraftDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth sx={{ alignItems: 'flex-start' }}>
              <Typography id="hotm-label">{options.hotmLabel}</Typography>
              <Grid alignItems="center" container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs>
                  <Slider
                    aria-describedby="hotm-description"
                    aria-label={options.hotmLabel}
                    aria-labelledby="hotm-label"
                    id="hotm"
                    marks
                    max={7}
                    min={2}
                    onChange={handleHOTMValue}
                    step={1}
                    value={hotm}
                    valueLabelDisplay="auto"
                  />
                </Grid>
                <Grid item>
                  <Input
                    inputProps={{
                      step: 10,
                      min: 0,
                      max: 100,
                      type: 'number',
                      'aria-labelledby': 'hotm'
                    }}
                    readOnly
                    size="small"
                    value={hotm}
                  />
                </Grid>
              </Grid>
              <FormHelperText id="hotm-description">{options.hotmDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth variant="standard">
              <Typography id="language-label">{options.languageLabel}</Typography>
              <Select
                aria-describedby="language-description"
                aria-labelledby="language-label"
                id="language"
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
                aria-describedby="maxCraftingCost-description"
                aria-labelledby="maxCraftingCost-label"
                id="maxCraftingCost"
                inputProps={{
                  min: 0,
                  type: 'number',
                  'aria-labelledby': 'input-slider'
                }}
                onChange={handleMaxCraftingCost}
                value={maxCraftingCost ?? 0}
              />

              <FormHelperText id="maxCraftingCost-description">{options.maxCraftingCostDescription}</FormHelperText>
            </FormControl>
          </ListItem>
          <ListItem divider>
            <FormControl fullWidth variant="standard">
              <Typography id="quickForge-label">{options.quickForgeLabel}</Typography>
              <Grid alignItems="center" container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs>
                  <Slider
                    aria-describedby="quickForge-description"
                    aria-label={options.quickForgeLabel}
                    aria-labelledby="quickForge-label"
                    id="quickForge"
                    marks
                    max={20}
                    min={0}
                    onChange={handleQuickForge}
                    step={1}
                    value={quickForge}
                    valueLabelDisplay="auto"
                  />
                </Grid>
                <Grid item>
                  <Input
                    inputProps={{
                      step: 10,
                      min: 0,
                      max: 20,
                      type: 'number',
                      'aria-labelledby': 'quickForge'
                    }}
                    readOnly
                    size="small"
                    value={quickForge}
                  />
                </Grid>
              </Grid>
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
