import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

// Header
export const Header = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
  padding-top: ${(props) => props.theme.spacing.xl}px;
  padding-bottom: ${(props) => props.theme.spacing.lg}px;
  background-color: ${(props) => props.theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.disabled}30;
`;

export const HeaderTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xxl}px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;

export const HeaderSubtitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 4px;
`;

// List
export const ListContainer = styled.View`
  padding: ${(props) => props.theme.spacing.md}px;
  padding-bottom: 100px;
`;

// Card moderno - ancho completo
export const Card = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 16px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props) => props.theme.dark ? 0.3 : 0.1};
  shadow-radius: 10px;
  elevation: 4;
`;

export const CardDisabled = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 16px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  overflow: hidden;
  opacity: 0.6;
`;

export const CardInner = styled.View`
  flex-direction: row;
  min-height: 160px;
`;

export const ImageContainer = styled.View`
  position: relative;
  width: 130px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

export const DiscountBadge = styled.View`
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 10px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.error};
`;

export const DiscountBadgeText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xs}px;
  font-weight: bold;
  color: #fff;
`;

export const SoldOutOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  align-items: center;
  justify-content: center;
`;

export const SoldOutText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 2px;
`;

export const CardContent = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spacing.md}px;
  justify-content: space-between;
`;

export const CardTop = styled.View`
  gap: 4px;
`;

export const ProductName = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
  gap: 10px;
  margin-top: 4px;
`;

export const OriginalPrice = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  text-decoration-line: line-through;
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const OfferPrice = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xxl}px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
`;

export const TimerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 6px 10px;
  background-color: ${(props) => props.theme.colors.warning}15;
  border-radius: 8px;
  align-self: flex-start;
`;

export const TimerText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.warning};
  font-weight: 600;
`;

export const StockContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
`;

export const StockText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  width: 100%;
`;

export const StockValue = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: 600;
  color: ${(props) => props.$urgent ? props.theme.colors.error : props.theme.colors.warning};
`;

export const ProgressBar = styled.View`
  height: 6px;
  background-color: ${(props) => props.theme.colors.disabled}30;
  border-radius: 3px;
  margin-top: 10px;
  overflow: hidden;
`;

export const ProgressFill = styled.View`
  height: 100%;
  width: ${(props) => props.$percent}%;
  background-color: ${(props) => props.$percent >= 90 ? props.theme.colors.error : props.theme.colors.primary};
  border-radius: 3px;
`;

export const CardBottom = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  gap: 12px;
`;

export const AddButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 12px;
  padding: 12px ${(props) => props.theme.spacing.md}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
`;

export const AddButtonText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: 600;
  color: #fff;
`;

export const AddButtonDisabled = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.disabled};
  border-radius: 12px;
  padding: 12px ${(props) => props.theme.spacing.md}px;
  align-items: center;
  justify-content: center;
`;

export const AddButtonDisabledText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textSecondary};
`;

// Empty state
export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 60px ${(props) => props.theme.spacing.lg}px;
`;

export const EmptyIcon = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.colors.primary}15;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const EmptyText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  text-align: center;
  color: ${(props) => props.theme.colors.textSecondary};
`;