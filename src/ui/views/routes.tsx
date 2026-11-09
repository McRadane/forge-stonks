import RNGIcon from '@mui/icons-material/Casino';
import AttributeSearchIcon from '@mui/icons-material/Fireplace';
import GardenIcon from '@mui/icons-material/Forest';
import PetsIcon from '@mui/icons-material/Pets';
import ForgeIcon from '@mui/icons-material/SettingsSuggest';
import type { ILanguage } from '@shared/resources/lang/type';
import { type JSX, lazy } from 'react';

const AttributeSearch = lazy(() => import('./AttributeSearch'));
const Forge = lazy(() => import('./Forge'));
const Garden = lazy(() => import('./Garden'));
const PetsFlips = lazy(() => import('./PetsFlips'));
const RNGFlips = lazy(() => import('./RNGFlips'));

export const routes: {
  element: JSX.Element;
  icon: JSX.Element;
  index?: boolean;
  path: string;
  title: keyof ILanguage['ui'];
}[] = [
  { element: <Forge path="forge" />, icon: <ForgeIcon />, index: true, path: 'forge', title: 'pageForge' },
  { element: <Garden path="garden" />, icon: <GardenIcon />, path: 'garden', title: 'pageGarden' },
  { element: <AttributeSearch path="attributes" />, icon: <AttributeSearchIcon />, path: 'attributes', title: 'pageAttributeSearch' },
  { element: <PetsFlips path="pets" />, icon: <PetsIcon />, path: 'pets', title: 'pagePetsFlips' },
  { element: <RNGFlips path="rng" />, icon: <RNGIcon />, path: 'rng', title: 'pageRNGFlips' }
];
