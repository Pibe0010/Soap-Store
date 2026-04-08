import styled from 'styled-components/native';
import { theme } from './theme';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Section = styled.View`
  padding: ${theme.spacing.lg}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${theme.typography.fontSizes.xl}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md}px;
`;

export const FormContainer = styled.View`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.spacing.sm}px;
  padding: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
`;

export const InputLabel = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs}px;
`;

export const Input = styled.TextInput`
  background-color: ${theme.colors.background};
  border-radius: ${theme.spacing.sm}px;
  padding: ${theme.spacing.md}px;
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.text};
  border-width: 1px;
  border-color: ${theme.colors.textSecondary}30;
  margin-bottom: ${theme.spacing.md}px;
`;

export const TextArea = styled.TextInput`
  background-color: ${theme.colors.background};
  border-radius: ${theme.spacing.sm}px;
  padding: ${theme.spacing.md}px;
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.text};
  border-width: 1px;
  border-color: ${theme.colors.textSecondary}30;
  margin-bottom: ${theme.spacing.md}px;
  min-height: 120px;
  text-align-vertical: top;
`;

export const ErrorText = styled.Text`
  font-size: ${theme.typography.fontSizes.sm}px;
  color: ${theme.colors.error};
  margin-bottom: ${theme.spacing.sm}px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  border-radius: ${theme.spacing.sm}px;
  padding: ${theme.spacing.md}px;
  align-items: center;
  justify-content: center;
  margin-top: ${theme.spacing.sm}px;
`;

export const SubmitButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: ${theme.typography.fontWeights.bold};
`;

export const InfoCard = styled.View`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.spacing.sm}px;
  padding: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
`;

export const InfoRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
`;

export const InfoText = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.text};
  margin-left: ${theme.spacing.md}px;
  flex-shrink: 1;
`;

export const SocialContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${theme.spacing.xl}px;
  padding: ${theme.spacing.lg}px;
`;

export const SocialButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${theme.colors.surface};
  align-items: center;
  justify-content: center;
  shadow-color: ${theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const ConfirmationText = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.primary};
  text-align: center;
  margin-top: ${theme.spacing.md}px;
  font-weight: ${theme.typography.fontWeights.medium};
`;
