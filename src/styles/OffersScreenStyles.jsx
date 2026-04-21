import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const ListContainer = styled.View`
  padding: ${(props) => props.theme.spacing.sm}px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Card = styled.TouchableOpacity`
  width: 48%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
  background-color: ${(props) => props.theme.colors.card};
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 120px;
  resize-mode: cover;
`;

export const CardContent = styled.View`
  padding: ${(props) => props.theme.spacing.md}px;
`;

export const ProductName = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 4px;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm}px;
`;

export const OriginalPrice = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  text-decoration-line: line-through;
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const DiscountBadge = styled.View`
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.success}20;
`;

export const DiscountText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.success};
`;

export const OfferPrice = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xl}px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-top: 4px;
`;

export const LowStock = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.warning};
  margin-top: 4px;
`;

export const SoldOut = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.error};
  margin-top: 4px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 80px ${(props) => props.theme.spacing.lg}px;
`;

export const EmptyText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.lg}px;
  color: ${(props) => props.theme.colors.textSecondary};
`;