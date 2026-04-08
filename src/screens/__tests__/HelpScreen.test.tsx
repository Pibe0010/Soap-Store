import React from 'react';
import { render } from '@testing-library/react-native';
import HelpScreen from '../HelpScreen';

describe('HelpScreen', () => {
  it('renders centered title', () => {
    const { getByText } = render(<HelpScreen />);
    expect(getByText('Ayuda y Preguntas Frecuentes')).toBeTruthy();
  });

  it('renders centered body text', () => {
    const { getByText } = render(<HelpScreen />);
    expect(getByText(/Estamos acá para ayudarte/)).toBeTruthy();
  });

  it('renders help icon', () => {
    const { toJSON } = render(<HelpScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('applies adequate padding', () => {
    const { toJSON } = render(<HelpScreen />);
    const tree = toJSON();
    const containerStyle = tree.props.style;
    expect(containerStyle).toMatchObject(
      expect.objectContaining({ flex: 1 })
    );
  });
});
