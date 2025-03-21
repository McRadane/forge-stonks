import { Chip } from '@mui/material';
import { Rarities } from '@shared/resources/items';
import { useLanguage } from '@shared/resources/lang/LanguageContext';
import { type FC, useMemo } from 'react';

interface IRarityProps {
  isColored?: boolean;
  rarity: Rarities;
  small?: boolean;
}

export const Rarity: FC<IRarityProps> = ({ isColored, rarity, small }) => {
  const { ui } = useLanguage();

  const rarityKey = useMemo(() => rarity.toLowerCase() as keyof typeof ui.rarities, [rarity, ui]);

  const [color, backgroundColor] = useMemo(() => {
    if (!isColored) {
      return [undefined, undefined];
    }

    switch (rarityKey) {
      case 'common':
        return ['#000000', '#FFFFFF'];
      case 'epic':
        return ['#000000', '#AA00AA'];
      case 'legendary':
        return ['#000000', '#FFAA00'];
      case 'mythic':
        return ['#000000', '#FF55FF'];
      case 'rare':
        return ['#000000', '#5555FF'];
      case 'uncommon':
        return ['#000000', '#55FF55'];
      default:
        return [undefined, undefined];
    }
  }, [isColored, rarityKey]);

  return (
    <Chip
      style={{
        backgroundColor: backgroundColor,
        color: color
      }}
      label={ui.rarities[rarityKey]}
      size={small ? 'small' : 'medium'}
    />
  );
};
