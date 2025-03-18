import { useGardenPrice } from '../garden/functions';
import { GardenDashboard } from '../garden/GardenDashboard';

const Garden = () => {
  const { fuels, organicMatters } = useGardenPrice();

  return <GardenDashboard fuels={fuels} organicMatters={organicMatters} />;
};

/**
 * Needed for React.lazy
 */
export default Garden;
