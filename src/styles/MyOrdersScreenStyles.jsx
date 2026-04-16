import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xl}px;
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

export const OrderCard = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.surface};
  margin-horizontal: ${(props) => props.theme.spacing.md}px;
  margin-top: ${(props) => props.theme.spacing.sm}px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  overflow: hidden;
`;

export const OrderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md}px;
`;

export const OrderInfo = styled.View`
  flex: 1;
`;

export const OrderDate = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 4px;
`;

export const OrderTotal = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

export const OrderItemsCount = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 2px;
`;

export const StatusBadge = styled.View`
  padding-vertical: 4px;
  padding-horizontal: ${(props) => props.theme.spacing.sm}px;
  border-radius: 12px;
  background-color: ${(props) => props.bgColor || props.theme.colors.disabled};
`;

export const StatusText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xs}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  color: ${(props) => props.textColor || props.theme.colors.textSecondary};
`;

export const OrderDetails = styled.View`
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.textSecondary}20;
  padding: ${(props) => props.theme.spacing.md}px;
`;

export const OrderItemRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${(props) => props.theme.spacing.sm}px;
`;

export const OrderItemImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: ${(props) => props.theme.spacing.xs}px;
  margin-right: ${(props) => props.theme.spacing.md}px;
`;

export const OrderItemInfo = styled.View`
  flex: 1;
`;

export const OrderItemName = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  color: ${(props) => props.theme.colors.text};
`;

export const OrderItemQuantity = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xs}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 2px;
`;

export const OrderItemPrice = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.primary};
`;

export const ExpandIcon = styled.View`
  margin-left: ${(props) => props.theme.spacing.sm}px;
`;
