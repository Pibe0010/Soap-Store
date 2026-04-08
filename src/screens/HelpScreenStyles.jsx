import styled from 'styled-components/native';
import { theme } from '../styles/theme';

export const HelpContainer = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl}px;
`;

export const HelpTitle = styled.Text`
  font-size: ${theme.typography.fontSizes.xxl}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text};
  text-align: center;
  margin-top: ${theme.spacing.lg}px;
`;

export const HelpText = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-top: ${theme.spacing.lg}px;
  line-height: 24px;
`;
