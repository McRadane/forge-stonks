import GardenIcon from '@mui/icons-material/Forest';
import ForgeIcon from '@mui/icons-material/SettingsSuggest';

import { Forge } from './Forge';
import { Garden } from './Garden';

export const routes: { index?: boolean; path: string; element: JSX.Element; title: string; option?: string; icon: JSX.Element }[] = [
  { element: <Forge />, icon: <ForgeIcon />, index: true, option: 'forge', path: 'forge', title: 'Forge' },
  { element: <Garden />, icon: <GardenIcon />, path: 'garden', title: 'Garden' }
];
