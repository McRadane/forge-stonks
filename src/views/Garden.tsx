import { GardenDashboard } from '../garden/GardenDashboard';
import { useGardenPrice } from '../garden/functions';

const Garden = () => {
  const { fuels, organicMatters } = useGardenPrice();

  return <GardenDashboard fuels={fuels} organicMatters={organicMatters} />;
};

/**
 * Needed for React.lazy
 */
// eslint-disable-next-line import/no-default-export
export default Garden;
