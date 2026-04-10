// Simple tests for ContactScreen - testing the import exists

import { render } from '@testing-library/react-native';
import ContactScreen from '../screens/ContactScreen';

describe('ContactScreen', () => {
  it('should import correctly', () => {
    expect(ContactScreen).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<ContactScreen />);
    expect(toJSON()).toBeDefined();
  });
});
