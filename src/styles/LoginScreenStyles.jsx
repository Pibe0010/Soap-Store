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

export const Content = styled.View`
  flex-grow: 1;
  justify-content: center;
  min-height: 100%;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xxl}px;
`;

export const Logo = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${theme.typography.fontSizes.xxxl}px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-top: ${theme.spacing.md}px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.xs}px;
  text-align: center;
  flex-shrink: 1;
  width: 100%;
`;

export const Form = styled.View`
  width: 100%;
`;

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  background-color: ${theme.colors.error}15;
  padding: ${theme.spacing.md}px;
  border-radius: 8px;
  margin-bottom: ${theme.spacing.md}px;
`;

export const ErrorIcon = styled.View`
  margin-top: 2px;
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
  padding: ${theme.spacing.md}px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: ${theme.spacing.md}px;
  min-height: 48px;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: 600;
  text-align: center;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: ${theme.spacing.lg}px;
  align-items: center;
  padding: ${theme.spacing.sm}px;
`;

export const ForgotPasswordText = styled.Text`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSizes.md}px;
  text-align: center;
  width: 100%;
`;

export const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${theme.spacing.xl}px;
`;

export const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${theme.colors.disabled};
`;

export const DividerText = styled.Text`
  color: ${theme.colors.textSecondary};
  margin-horizontal: ${theme.spacing.md}px;
`;

export const SocialButtons = styled.View`
  width: 100%;
`;

export const FooterContainer = styled.View`
  align-items: center;
  margin-top: ${theme.spacing.xl}px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const FooterText = styled.Text`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSizes.md}px;
  width: 50%;
`;

export const RegisterLink = styled.Text`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSizes.md}px;
  font-weight: 600;
`;

export const RegisterButton = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px;
`;
