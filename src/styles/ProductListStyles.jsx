import styled from 'styled-components/native';
import { theme } from './theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.md}px;
`;

export const ListContentContainer = styled.View`
  padding-bottom: ${theme.spacing.lg}px;
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

export const EmptyText = styled.Text`
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-top: ${theme.spacing.lg}px;
  font-size: ${theme.typography.fontSizes.md}px;
`;