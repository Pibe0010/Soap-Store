import styled from 'styled-components/native';
import { theme } from './theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.xl}px;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
`;

export const BackButton = styled.TouchableOpacity`
  margin-bottom: ${theme.spacing.lg}px;
  padding: ${theme.spacing.sm}px;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xxl}px;
`;

export const Title = styled.Text`
  font-size: ${theme.typography.fontSizes.xxl}px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-top: ${theme.spacing.md}px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.sm}px;
  text-align: center;
  padding-horizontal: ${theme.spacing.lg}px;
  flex-shrink: 1;
`;

export const Form = styled.View`
  width: 100%;
`;

export const HintContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
`;

export const HintIcon = styled.View`
  margin-right: ${theme.spacing.xs}px;
`;

export const HintText = styled.Text`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSizes.sm}px;
  flex: 1;
  flex-shrink: 1;
`;

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.error}15;
  padding: ${theme.spacing.md}px;
  border-radius: 8px;
  margin-bottom: ${theme.spacing.md}px;
`;

export const ErrorIcon = styled.View`
  margin-right: ${theme.spacing.sm}px;
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSizes.sm}px;
  flex: 1;
  flex-shrink: 1;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${props => props.disabled ? theme.colors.disabled : theme.colors.primary};
  padding-vertical: ${theme.spacing.md}px;
  border-radius: 8px;
  align-items: center;
  margin-top: ${theme.spacing.md}px;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: 600;
`;
