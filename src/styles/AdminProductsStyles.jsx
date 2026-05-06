import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Header = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
  background-color: ${(props) => props.theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.textSecondary}20;
`;

export const HeaderTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xxl}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

export const HeaderSubtitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: ${(props) => props.theme.spacing.xs}px;
`;

export const Section = styled.View`
  padding: ${(props) => props.theme.spacing.md}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const Card = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.spacing.md}px;
  padding: ${(props) => props.theme.spacing.md}px;
`;

export const InputLabel = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.xs}px;
  margin-top: ${(props) => props.theme.spacing.sm}px;
`;

export const InputRow = styled.View`
  flex-direction: row;
  gap: ${(props) => props.theme.spacing.md}px;
`;

export const InputWrapper = styled.View`
  flex: 1;
`;

export const Input = styled.TextInput`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.sm}px;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.textSecondary}30;
`;

export const TextArea = styled.TextInput`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.sm}px;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.textSecondary}30;
  min-height: 80px;
  text-align-vertical: top;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.md}px;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.md}px;
`;

export const SubmitButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
`;

export const ProductCard = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.spacing.md}px;
  padding: ${(props) => props.theme.spacing.md}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const ProductImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  margin-right: ${(props) => props.theme.spacing.md}px;
`;

export const ProductInfo = styled.View`
  flex: 1;
  padding-right: ${(props) => props.theme.spacing.sm}px;
`;

export const ProductName = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

export const ProductDetails = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 4px;
`;

export const BadgesRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  flex-wrap: wrap;
  gap: 6px;
`;

export const StockBadge = styled.View`
  background-color: ${(props) => props.$outOfStock ? props.theme.colors.error + '30' : props.theme.colors.success + '30'};
  padding: 4px 10px;
  border-radius: 12px;
`;

export const StockText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  color: ${(props) => props.$outOfStock ? props.theme.colors.error : props.theme.colors.success};
`;

export const ActiveBadge = styled.View`
  background-color: ${(props) => (props.$active ? props.theme.colors.success : props.theme.colors.disabled) + '30'};
  padding: 4px 10px;
  border-radius: 12px;
`;

export const ActiveText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  color: ${(props) => props.$active ? props.theme.colors.success : props.theme.colors.disabled};
`;

export const ActionButtons = styled.View`
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs}px;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: ${(props) => props.theme.spacing.sm}px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  background-color: ${(props) => props.$variant === 'danger' ? props.theme.colors.error : props.theme.colors.primary}15;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  padding: ${(props) => props.theme.spacing.xl}px;
`;

export const EmptyIcon = styled.View`
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const EmptyText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
`;

export const CategorySelect = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.sm}px;
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`;

export const CategoryChip = styled.TouchableOpacity`
  padding: ${(props) => props.theme.spacing.sm}px ${(props) => props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.spacing.md}px;
  background-color: ${(props) => props.$selected ? props.theme.colors.primary : props.theme.colors.background};
  border-width: 1px;
  border-color: ${(props) => props.$selected ? props.theme.colors.primary : props.theme.colors.textSecondary}30;
`;

export const CategoryChipText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.$selected ? props.theme.colors.white : props.theme.colors.text};
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing.sm}px;
`;

export const ToggleLabel = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.text};
  width: 65%;
`;

export const Toggle = styled.Switch``;