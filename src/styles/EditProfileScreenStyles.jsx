import styled from 'styled-components/native';
import { theme } from './theme';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 32 },
})`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.xl}px;
  padding-top: ${theme.spacing.xl + 20}px;
  align-items: center;
`;

export const AvatarContainer = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${theme.colors.surface};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md}px;
  border-width: 3px;
  border-color: ${theme.colors.surface};
`;

export const AvatarIcon = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${theme.colors.primary};
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${theme.colors.surface};
`;

export const HeaderTitle = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.white};
`;

export const FormContainer = styled.View`
  padding: ${theme.spacing.lg}px;
`;

export const FormGroup = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

export const Label = styled.Text`
  font-size: ${theme.typography.fontSizes.sm}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.xs}px;
`;

export const Input = styled.TextInput`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.spacing.sm}px;
  padding: ${theme.spacing.md}px;
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.text};
  border-width: 1px;
  border-color: ${theme.colors.textSecondary}30;
`;

export const InputDisabled = styled.TextInput`
  background-color: ${theme.colors.disabled}20;
  border-radius: ${theme.spacing.sm}px;
  padding: ${theme.spacing.md}px;
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.textSecondary};
  border-width: 1px;
  border-color: ${theme.colors.textSecondary}20;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.spacing.sm}px;
  align-items: center;
  margin-horizontal: ${theme.spacing.lg}px;
  margin-top: ${theme.spacing.md}px;
`;

export const SaveButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.md}px;
  font-weight: ${theme.typography.fontWeights.bold};
`;

export const ErrorText = styled.Text`
  font-size: ${theme.typography.fontSizes.xs}px;
  color: ${theme.colors.error};
  margin-top: 4px;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;
