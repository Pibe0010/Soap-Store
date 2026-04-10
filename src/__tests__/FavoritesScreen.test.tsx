import { render } from '@testing-library/react-native';
import FavoritesScreen from '../screens/FavoritesScreen';

describe('FavoritesScreen', () => {
  it('should import correctly', () => {
    expect(FavoritesScreen).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<FavoritesScreen />);
    expect(toJSON()).toBeDefined();
  });
});
