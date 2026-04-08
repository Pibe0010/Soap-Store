import styled from 'styled-components/native';
import { theme } from './theme';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 24 },
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

export const HeaderTitle = styled.Text`
  font-size: ${theme.typography.fontSizes.xl}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.white};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl}px;
  min-height: 400px;
`;

export const EmptyText = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-top: ${theme.spacing.md}px;
`;

export const EmptySubtext = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-top: ${theme.spacing.xs}px;
`;

export const AddressCard = styled.View`
  background-color: ${theme.colors.surface};
  margin-horizontal: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.sm}px;
  border-radius: ${theme.spacing.sm}px;
  padding: ${theme.spacing.md}px;
  border-left-width: 4px;
  border-left-color: ${(props) => props.isDefault ? theme.colors.primary : theme.colors.textSecondary + '30'};
`;

export const AddressHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

export const AddressLabel = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text};
`;

export const DefaultBadge = styled.View`
  background-color: ${theme.colors.primary}20;
  padding-vertical: 2px;
  padding-horizontal: 8px;
  border-radius: 10px;
`;

export const DefaultBadgeText = styled.Text`
  font-size: ${theme.typography.fontSizes.xs}px;
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.fontWeights.medium};
`;

export const AddressLine = styled.Text`
  font-size: ${theme.typography.fontSizes.sm}px;
  color: ${theme.colors.textSecondary};
  margin-top: 2px;
`;

export const AddressActions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${theme.spacing.sm}px;
  gap: ${theme.spacing.sm}px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 6px ${theme.spacing.sm}px;
  border-radius: ${theme.spacing.xs}px;
  background-color: ${(props) => props.bgColor || theme.colors.textSecondary + '15'};
`;

export const ActionButtonText = styled.Text`
  font-size: ${theme.typography.fontSizes.xs}px;
  color: ${(props) => props.textColor || theme.colors.textSecondary};
  margin-left: 4px;
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary};
  margin: ${theme.spacing.md}px;
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.spacing.sm}px;
`;

export const AddButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.md}px;
  font-weight: ${theme.typography.fontWeights.bold};
  margin-left: ${theme.spacing.sm}px;
`;

/* Form styles */
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

export const ErrorText = styled.Text`
  font-size: ${theme.typography.fontSizes.xs}px;
  color: ${theme.colors.error};
  margin-top: 4px;
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

export const DefaultToggle = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px 0;
`;

export const DefaultToggleText = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.text};
  margin-left: ${theme.spacing.sm}px;
`;

export const Checkbox = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${(props) => props.checked ? theme.colors.primary : theme.colors.textSecondary};
  background-color: ${(props) => props.checked ? theme.colors.primary : 'transparent'};
  align-items: center;
  justify-content: center;
`;
