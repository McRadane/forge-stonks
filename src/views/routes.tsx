import AttributeSearchIcon from '@mui/icons-material/Fireplace';
import GardenIcon from '@mui/icons-material/Forest';
import ForgeIcon from '@mui/icons-material/SettingsSuggest';
// import PetsIcon from '@mui/icons-material/Pets';
import { type JSX, lazy } from 'react';

import type { ILanguage } from '../resources/lang/type';

const Forge = lazy(() => import('./Forge'));
const Garden = lazy(() => import('./Garden'));
const AttributeSearch = lazy(() => import('./AttributeSearch'));

export const routes: {
  element: JSX.Element;
  icon: JSX.Element;
  index?: boolean;
  option?: string;
  path: string;
  title: keyof ILanguage['ui'];
}[] = [
  { element: <Forge />, icon: <ForgeIcon />, index: true, option: 'forge', path: 'forge', title: 'pageForge' },
  { element: <Garden />, icon: <GardenIcon />, option: 'garden', path: 'garden', title: 'pageGarden' },
  { element: <AttributeSearch />, icon: <AttributeSearchIcon />, option: 'attribute', path: 'attributes', title: 'pageAttributeSearch' }
];
