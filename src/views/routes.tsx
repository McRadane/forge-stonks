import GardenIcon from '@mui/icons-material/Forest';
import ForgeIcon from '@mui/icons-material/SettingsSuggest';
import { lazy } from 'react';

import type { ILanguage } from '../resources/lang/type';

const Forge = lazy(() => import('./Forge'));
const Garden = lazy(() => import('./Garden'));

export const routes: {
  index?: boolean;
  path: string;
  element: JSX.Element;
  title: keyof ILanguage['ui'];
  option?: string;
  icon: JSX.Element;
}[] = [
  { element: <Forge />, icon: <ForgeIcon />, index: true, option: 'forge', path: 'forge', title: 'pageForge' },
  { element: <Garden />, icon: <GardenIcon />, path: 'garden', title: 'pageGarden' }
];
