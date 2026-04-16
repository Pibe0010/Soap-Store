import styled from 'styled-components/native';
import { theme } from './theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.md}px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.md}px;
`;

export const Content = styled.View`
  gap: ${theme.spacing.sm}px;
`;

export const Title = styled.Text`
  font-size: ${theme.typography.fontSizes.xl}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text};
`;

export const Category = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.textSecondary};
  flex-wrap: wrap;
  flex: 1;
`;

export const Label = styled.Text`
  font-size: ${theme.typography.fontSizes.sm}px;
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.typography.fontWeights.medium};
`;

export const Description = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.text};
  line-height: ${theme.typography.fontSizes.md * 1.5}px;
`;

export const Price = styled.Text`
  font-size: ${theme.typography.fontSizes.xxl}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary};
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-top: ${theme.spacing.lg}px;
  font-size: ${theme.typography.fontSizes.md}px;
`;

export const RetryText = styled.Text`
  color: ${theme.colors.primary};
  text-align: center;
  margin-top: ${theme.spacing.sm}px;
  font-size: ${theme.typography.fontSizes.sm}px;
`;

export const BackText = styled.Text`
  color: ${theme.colors.primary};
  text-align: center;
  margin-top: ${theme.spacing.lg}px;
  font-size: ${theme.typography.fontSizes.md}px;
`;

export const ButtonContainer = styled.View`
  margin-top: ${theme.spacing.md}px;
`;