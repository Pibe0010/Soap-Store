import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 32 },
})`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.xl}px;
  padding-top: ${(props) => props.theme.spacing.xl + 20}px;
  align-items: center;
`;

export const AvatarContainer = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.colors.surface};
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  border-width: 3px;
  border-color: ${(props) => props.theme.colors.surface};
`;

export const AvatarIcon = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.surface};
`;

export const HeaderTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.white};
`;

export const FormContainer = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
`;

export const FormGroup = styled.View`
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

export const Label = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.xs}px;
`;

export const Input = styled.TextInput`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.md}px;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.textSecondary}30;
`;

export const InputDisabled = styled.TextInput`
  background-color: ${(props) => props.theme.colors.disabled}20;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.md}px;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.textSecondary};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.textSecondary}20;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  align-items: center;
  margin-horizontal: ${(props) => props.theme.spacing.lg}px;
  margin-top: ${(props) => props.theme.spacing.md}px;
`;

export const SaveButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
`;

export const ErrorText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xs}px;
  color: ${(props) => props.theme.colors.error};
  margin-top: 4px;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;
