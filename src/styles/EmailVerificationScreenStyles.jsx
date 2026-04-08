import styled from 'styled-components/native';
import { theme } from './theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl}px;
`;

export const Title = styled.Text`
  font-size: ${theme.typography.fontSizes.xxl}px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-top: ${theme.spacing.lg}px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.sm}px;
  text-align: center;
  flex-shrink: 1;
`;

export const Email = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin-top: ${theme.spacing.xs}px;
  text-align: center;
`;

export const Instruction = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.xl}px;
  text-align: center;
  padding-horizontal: ${theme.spacing.lg}px;
  flex-shrink: 1;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${props => props.disabled ? theme.colors.disabled : theme.colors.primary};
  padding-vertical: ${theme.spacing.md}px;
  padding-horizontal: ${theme.spacing.xl}px;
  border-radius: 8px;
  margin-top: ${theme.spacing.xl}px;
  min-width: 250px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: 600;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: ${theme.spacing.lg}px;
  padding: ${theme.spacing.md}px;
`;

export const BackButtonText = styled.Text`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSizes.md}px;
`;
