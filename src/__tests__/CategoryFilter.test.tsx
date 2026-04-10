import { render } from '@testing-library/react-native';
import CategoryFilter from '../components/CategoryFilter';

describe('CategoryFilter', () => {
  it('should import correctly', () => {
    expect(CategoryFilter).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<CategoryFilter categories={['Soap', 'Shampoo']} selectedCategory="Soap" onSelectCategory={() => {}} />);
    expect(toJSON()).toBeDefined();
  });
});
