import styled from 'styled-components/native';
import { theme } from './theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl}px;
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

export const OrderCard = styled.TouchableOpacity`
  background-color: ${theme.colors.surface};
  margin-horizontal: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.sm}px;
  border-radius: ${theme.spacing.sm}px;
  overflow: hidden;
`;

export const OrderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md}px;
`;

export const OrderInfo = styled.View`
  flex: 1;
`;

export const OrderDate = styled.Text`
  font-size: ${theme.typography.fontSizes.sm}px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 4px;
`;

export const OrderTotal = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text};
`;

export const OrderItemsCount = styled.Text`
  font-size: ${theme.typography.fontSizes.sm}px;
  color: ${theme.colors.textSecondary};
  margin-top: 2px;
`;

export const StatusBadge = styled.View`
  padding-vertical: 4px;
  padding-horizontal: ${theme.spacing.sm}px;
  border-radius: 12px;
  background-color: ${(props) => props.bgColor || theme.colors.disabled};
`;

export const StatusText = styled.Text`
  font-size: ${theme.typography.fontSizes.xs}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${(props) => props.textColor || theme.colors.textSecondary};
`;

export const OrderDetails = styled.View`
  border-top-width: 1px;
  border-top-color: ${theme.colors.textSecondary}20;
  padding: ${theme.spacing.md}px;
`;

export const OrderItemRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${theme.spacing.sm}px;
`;

export const OrderItemImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: ${theme.spacing.xs}px;
  margin-right: ${theme.spacing.md}px;
`;

export const OrderItemInfo = styled.View`
  flex: 1;
`;

export const OrderItemName = styled.Text`
  font-size: ${theme.typography.fontSizes.sm}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text};
`;

export const OrderItemQuantity = styled.Text`
  font-size: ${theme.typography.fontSizes.xs}px;
  color: ${theme.colors.textSecondary};
  margin-top: 2px;
`;

export const OrderItemPrice = styled.Text`
  font-size: ${theme.typography.fontSizes.sm}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary};
`;

export const ExpandIcon = styled.View`
  margin-left: ${theme.spacing.sm}px;
`;
