import GardenIcon from '@mui/icons-material/Forest';
import ForgeIcon from '@mui/icons-material/SettingsSuggest';
import { type JSX, lazy } from 'react';

import type { ILanguage } from '../resources/lang/type';

const Forge = lazy(() => import('./Forge'));
const Garden = lazy(() => import('./Garden'));

export const routes: {
  element: JSX.Element;
  icon: JSX.Element;
  index?: boolean;
  option?: string;
  path: string;
  title: keyof ILanguage['ui'];
}[] = [
  { element: <Forge />, icon: <ForgeIcon />, index: true, option: 'forge', path: 'forge', title: 'pageForge' },
  { element: <Garden />, icon: <GardenIcon />, path: 'garden', title: 'pageGarden' }
];
