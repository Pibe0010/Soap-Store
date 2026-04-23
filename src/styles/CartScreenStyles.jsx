import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.lg}px;
  background-color: ${(props) => props.theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.textSecondary}20;
`;

export const Title = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xl}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

export const EmptyText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.md}px;
  width: 100%;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.surface};
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
  margin-horizontal: ${(props) => props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.spacing.md}px;
  overflow: hidden;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const ItemImage = styled.Image`
  width: 100px;
  height: 100%;
  min-height: 120px;
`;

export const ItemInfo = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spacing.md}px;
  justify-content: space-between;
  position: relative;
`;

export const ItemName = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.xs}px;
`;

export const Label = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xs}px;
  color: ${(props) => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ItemPrice = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.primary};
  margin-left: ${(props) => props.theme.spacing.xs}px;
`;

export const QuantityControls = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${(props) => props.theme.spacing.xs}px;
`;

export const QuantityButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.spacing.sm}px;
`;

export const QuantityText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
  min-width: 40px;
  text-align: center;
`;

export const ItemQuantity = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
  margin-horizontal: ${(props) => props.theme.spacing.md}px;
  min-width: 30px;
  text-align: center;
`;

export const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: ${(props) => props.theme.spacing.sm}px;
  right: ${(props) => props.theme.spacing.sm}px;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.error}15;
  align-items: center;
  justify-content: center;
`;

export const BottomRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Footer = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.lg}px;
  padding-bottom: ${(props) => props.theme.spacing.lg}px;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.textSecondary}20;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xl}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

export const ClearButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs}px;
  padding: ${(props) => props.theme.spacing.sm}px ${(props) => props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.error};
`;

export const ClearButtonText = styled.Text`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

export const CheckoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.md}px ${(props) => props.theme.spacing.xl}px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
`;

export const CheckoutButtonText = styled.Text`
  color: ${(props) => props.theme.colors.background};
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
`;