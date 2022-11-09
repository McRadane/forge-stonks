import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setHOTM, toggleAuctionsBINOnly, toggleIncludeAuctionsFlip, toggleIntermediateCraft } from '../services/options';
import { Slider } from '@mui/material';

export const OptionsSwitcher = () => {
  const dispatch = useDispatch();

  const includeAuctionsFlip = useSelector((state: RootState) => state.options.includeAuctionsFlip);
  const auctionsBINOnly = useSelector((state: RootState) => state.options.auctionsBINOnly);
  const intermediateCraft = useSelector((state: RootState) => state.options.intermediateCraft);

  const hotm = useSelector((state: RootState) => state.options.hotm);

  const setIncludeAuctionsFlip = () => {
    dispatch(toggleIncludeAuctionsFlip());
  };
  const setAuctionsBINOnly = () => {
    dispatch(toggleAuctionsBINOnly());
  };
  const setIntermediateCraft = () => {
    dispatch(toggleIntermediateCraft());
  };

  const setHOTMValue = (_e: any, num: any) => {
    dispatch(setHOTM(num));
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={includeAuctionsFlip} onChange={setIncludeAuctionsFlip} />}
        label="Include Auctions-only craft"
      />
      <FormControlLabel
        control={<Switch checked={auctionsBINOnly} onChange={setAuctionsBINOnly} />}
        label="Use BINs Auctions only for material"
      />
      <FormControlLabel
        control={<Switch checked={intermediateCraft} onChange={setIntermediateCraft} />}
        label="Craft intermediary material instead of buying-it"
      />
      <Slider aria-label="HOTM" value={hotm} onChange={setHOTMValue} valueLabelDisplay="auto" step={1} marks min={2} max={7} />
    </FormGroup>
  );
};
