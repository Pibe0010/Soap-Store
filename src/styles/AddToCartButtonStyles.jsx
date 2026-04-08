import styled from 'styled-components/native';
import { theme } from './theme';

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  padding: ${props => props.size === 'small' ? theme.spacing.sm : theme.spacing.md}px;
  border-radius: ${theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm}px;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.background};
  font-size: ${props => props.size === 'small' ? theme.typography.fontSizes.sm : theme.typography.fontSizes.md}px;
  font-weight: ${theme.typography.fontWeights.bold};
  text-align: center;
`;