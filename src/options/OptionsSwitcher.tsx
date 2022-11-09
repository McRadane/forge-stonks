import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import { options } from "./options";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleAuctionsBINOnly, toggleIncludeAuctionsFlip, toggleIntermediateCraft } from '../services/options';

export const OptionsSwitcher = () => {
  const dispatch = useDispatch();
  //const [includeAuctionsFlip, setIncludeAuctionsFlip] = useState(options.includeAuctionsFlip);
  //const [auctionsBINOnly, setAuctionsBINOnly] = useState(options.auctionsBINOnly);
  //const [intermediateCraft, setIntermediateCraft] = useState(options.intermediateCraft);

  const includeAuctionsFlip = useSelector((state: RootState) => state.options.includeAuctionsFlip);
  const auctionsBINOnly = useSelector((state: RootState) => state.options.auctionsBINOnly);
  const intermediateCraft = useSelector((state: RootState) => state.options.intermediateCraft);

  const setIncludeAuctionsFlip = () => {
    dispatch(toggleIncludeAuctionsFlip());
  };
  const setAuctionsBINOnly = () => {
    dispatch(toggleAuctionsBINOnly());
  };
  const setIntermediateCraft = () => {
    dispatch(toggleIntermediateCraft());
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
    </FormGroup>
  );
};
