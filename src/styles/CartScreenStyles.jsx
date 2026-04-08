import styled from 'styled-components/native';
import { theme } from './theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.textSecondary}20;
`;

export const Title = styled.Text`
  font-size: ${theme.typography.fontSizes.xl}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text};
`;

export const EmptyText = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-top: ${theme.spacing.md}px;
  width: 100%;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
  background-color: ${theme.colors.surface};
  margin-bottom: ${theme.spacing.sm}px;
  margin-horizontal: ${theme.spacing.md}px;
  border-radius: ${theme.spacing.sm}px;
`;

export const ItemImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: ${theme.spacing.sm}px;
  margin-right: ${theme.spacing.md}px;
`;

export const ItemInfo = styled.View`
  flex: 1;
`;

export const ItemName = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs}px;
`;

export const ItemPrice = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm}px;
`;

export const QuantityControls = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const QuantityButton = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
`;

export const QuantityText = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary};
`;

export const ItemQuantity = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text};
  margin-horizontal: ${theme.spacing.md}px;
  min-width: 30px;
  text-align: center;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px;
`;

export const Footer = styled.View`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.lg}px;
  padding-bottom: ${theme.spacing.lg}px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.textSecondary}20;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalText = styled.Text`
  font-size: ${theme.typography.fontSizes.xl}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text};
`;

export const ClearButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.xs}px;
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.spacing.sm}px;
  border-width: 1px;
  border-color: ${theme.colors.error};
`;

export const ClearButtonText = styled.Text`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSizes.sm}px;
  font-weight: ${theme.typography.fontWeights.medium};
`;

export const CheckoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.md}px ${theme.spacing.xl}px;
  border-radius: ${theme.spacing.sm}px;
`;

export const CheckoutButtonText = styled.Text`
  color: ${theme.colors.background};
  font-size: ${theme.typography.fontSizes.md}px;
  font-weight: ${theme.typography.fontWeights.bold};
`;