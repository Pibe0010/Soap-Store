import styled from 'styled-components/native';
import { theme } from './theme';

export const Container = styled.TouchableOpacity`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.spacing.sm}px;
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.sm}px;
  width: 100%;
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const Content = styled.View`
  gap: ${theme.spacing.xs}px;
`;

export const Title = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text};
`;

export const Category = styled.Text`
  font-size: ${theme.typography.fontSizes.sm}px;
  color: ${theme.colors.textSecondary};
  flex-wrap: wrap;
  flex: 1;
`;

export const Label = styled.Text`
  font-size: ${theme.typography.fontSizes.xs}px;
  color: ${theme.colors.textSecondary};
`;

export const Price = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary};
`;

export const ButtonContainer = styled.View`
  margin-top: ${theme.spacing.sm}px;
`;