import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Section = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xl}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const FormContainer = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.lg}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const InputLabel = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.xs}px;
`;

export const Input = styled.TextInput`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.md}px;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.textSecondary}30;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const TextArea = styled.TextInput`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.md}px;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.textSecondary}30;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  min-height: 120px;
  text-align-vertical: top;
`;

export const ErrorText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.error};
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.md}px;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing.sm}px;
`;

export const SubmitButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
`;

export const InfoCard = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.lg}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const InfoRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const InfoText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
  margin-left: ${(props) => props.theme.spacing.md}px;
  flex-shrink: 1;
`;

export const SocialContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.xl}px;
  padding: ${(props) => props.theme.spacing.lg}px;
`;

export const SocialButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.colors.surface};
  align-items: center;
  justify-content: center;
  shadow-color: ${(props) => props.theme.colors.text};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const ConfirmationText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;
