import styled from 'styled-components/native';

// Container principal
export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

// Header
export const Header = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
  padding-top: ${(props) => props.theme.spacing.md}px;
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

// Section
export const Section = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
  padding-top: ${(props) => props.theme.spacing.sm}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

// Card moderna
export const Card = styled.View`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 16px;
  padding: ${(props) => props.theme.spacing.lg}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props) => props.theme.dark ? 0.3 : 0.08};
  shadow-radius: 8px;
  elevation: 3;
`;

// Dropdown
export const DropdownTrigger = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing.md}px;
  border-width: 1px;
  border-color: ${(props) => props.$selected ? props.theme.colors.primary : props.theme.colors.disabled}40;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const DropdownText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.$selected ? props.theme.colors.text : props.theme.colors.textSecondary};
  flex: 1;
`;

export const DropdownMenu = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 12px;
  z-index: 101;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 8;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.disabled}40;
  overflow: hidden;
`;

export const DropdownItem = styled.TouchableOpacity`
  padding: ${(props) => props.theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.disabled}20;
  background-color: ${(props) => props.$selected ? props.theme.colors.primary + '15' : 'transparent'};
`;

export const DropdownItemText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
`;

export const DropdownItemPrice = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 2px;
`;

// Inputs
export const InputLabel = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 6px;
  font-weight: 500;
`;

export const InputRow = styled.View`
  flex-direction: row;
  gap: ${(props) => props.theme.spacing.md}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const InputWrapper = styled.View`
  flex: 1;
`;

export const Input = styled.TextInput`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing.md}px;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.disabled}40;
`;

// Date picker
export const DateInput = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing.md}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.disabled}40;
  margin-bottom: 12px;
`;

export const DateText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.$hasDate ? props.theme.colors.text : props.theme.colors.textSecondary};
`;

// Botón submit
export const SubmitButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing.md}px;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.md}px;
  shadow-color: ${(props) => props.theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: 600;
`;

// Backdrop
export const Backdrop = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

// Offer Card
export const OfferCardWrapper = styled.View`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 16px;
  padding: ${(props) => props.theme.spacing.md}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props) => props.theme.dark ? 0.3 : 0.06};
  shadow-radius: 8px;
  elevation: 2;
`;

export const OfferHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`;

export const OfferInfo = styled.View`
  flex: 1;
`;

export const RowWrap = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

export const OfferTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

export const DiscountBadge = styled.View`
  background-color: ${(props) => props.theme.colors.success}25;
  padding: 4px 10px;
  border-radius: 20px;
`;

export const DiscountBadgeText = styled.Text`
  color: ${(props) => props.theme.colors.success};
  font-weight: 700;
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
`;

export const OfferDetails = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 4px;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  gap: ${(props) => props.theme.spacing.sm}px;
  margin-top: ${(props) => props.theme.spacing.sm}px;
`;

export const IconButton = styled.TouchableOpacity`
  padding: ${(props) => props.theme.spacing.sm}px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const StatusBadge = styled.View`
  background-color: ${(props) => props.$active ? props.theme.colors.success + '20' : props.theme.colors.disabled + '30'};
  padding: 4px 8px;
  border-radius: 6px;
`;

export const StatusText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xs}px;
  font-weight: 600;
  color: ${(props) => props.$active ? props.theme.colors.success : props.theme.colors.textSecondary};
`;

// Empty state
export const EmptyContainer = styled.View`
  align-items: center;
  padding: ${(props) => props.theme.spacing.xl}px;
`;

export const EmptyIcon = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${(props) => props.theme.colors.primary}15;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
`;