import { GardenDashboard } from '../garden/GardenDashboard';
import { useGardenPrice } from '../garden/functions';

export const Garden = () => {
  const { fuels, organicMatters } = useGardenPrice();

  return <GardenDashboard fuels={fuels} organicMatters={organicMatters} />;
};
