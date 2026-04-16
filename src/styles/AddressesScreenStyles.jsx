import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 24 },
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

export const HeaderTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xl}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.white};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xl}px;
  min-height: 400px;
`;

export const EmptyText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.md}px;
`;

export const EmptySubtext = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.xs}px;
`;

export const AddressCard = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  margin-horizontal: ${(props) => props.theme.spacing.md}px;
  margin-top: ${(props) => props.theme.spacing.sm}px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.md}px;
  border-left-width: 4px;
  border-left-color: ${(props) => props.isDefault ? props.theme.colors.primary : props.theme.colors.textSecondary + '30'};
`;

export const AddressHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`;

export const AddressLabel = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

export const DefaultBadge = styled.View`
  background-color: ${(props) => props.theme.colors.primary}20;
  padding-vertical: 2px;
  padding-horizontal: 8px;
  border-radius: 10px;
`;

export const DefaultBadgeText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xs}px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

export const AddressLine = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 2px;
`;

export const AddressActions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${(props) => props.theme.spacing.sm}px;
  gap: ${(props) => props.theme.spacing.sm}px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 6px ${(props) => props.theme.spacing.sm}px;
  border-radius: ${(props) => props.theme.spacing.xs}px;
  background-color: ${(props) => props.bgColor || props.theme.colors.textSecondary + '15'};
`;

export const ActionButtonText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xs}px;
  color: ${(props) => props.textColor || props.theme.colors.textSecondary};
  margin-left: 4px;
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  margin: ${(props) => props.theme.spacing.md}px;
  padding: ${(props) => props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
`;

export const AddButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  margin-left: ${(props) => props.theme.spacing.sm}px;
`;

/* Form styles */
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

export const ErrorText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xs}px;
  color: ${(props) => props.theme.colors.error};
  margin-top: 4px;
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

export const DefaultToggle = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md}px 0;
`;

export const DefaultToggleText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
  margin-left: ${(props) => props.theme.spacing.sm}px;
`;

export const Checkbox = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${(props) => props.checked ? props.theme.colors.primary : props.theme.colors.textSecondary};
  background-color: ${(props) => props.checked ? props.theme.colors.primary : 'transparent'};
  align-items: center;
  justify-content: center;
`;
