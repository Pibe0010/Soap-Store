import { render } from '@testing-library/react-native';
import FavoriteButton from '../components/FavoriteButton';

describe('FavoriteButton', () => {
  it('should import correctly', () => {
    expect(FavoriteButton).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<FavoriteButton productId="1" />);
    expect(toJSON()).toBeDefined();
  });
});
