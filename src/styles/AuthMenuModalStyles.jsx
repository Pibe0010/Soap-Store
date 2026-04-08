import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { theme } from './theme';

export const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const MODAL_WIDTH = SCREEN_WIDTH * 0.7;

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const OverlayTouchable = styled.TouchableOpacity`
  flex: 1;
`;

export const SlidePanel = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${MODAL_WIDTH}px;
  background-color: ${theme.colors.surface};
  padding-top: 60px;
  padding-horizontal: ${theme.spacing.lg}px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  right: ${theme.spacing.lg}px;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
`;

export const MenuHeader = styled.View`
  padding: ${theme.spacing.lg}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.textSecondary}20;
  margin-bottom: ${theme.spacing.lg}px;
`;

export const MenuTitle = styled.Text`
  font-size: ${theme.typography.fontSizes.xxl}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text};
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.lg}px 0;
  min-height: 48px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.textSecondary}10;
`;

export const MenuItemText = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  color: ${theme.colors.text};
  margin-left: ${theme.spacing.md}px;
  font-weight: ${theme.typography.fontWeights.medium};
`;

export const MenuDivider = styled.View`
  height: 1px;
  background-color: ${theme.colors.textSecondary}30;
  margin-vertical: ${theme.spacing.md}px;
`;

export const UserBadge = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
  background-color: ${theme.colors.background};
  border-radius: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.lg}px;
`;

export const UserName = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.text};
  margin-left: ${theme.spacing.md}px;
  font-weight: ${theme.typography.fontWeights.medium};
`;

export const LogoutText = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  color: ${theme.colors.error};
  margin-left: ${theme.spacing.md}px;
  font-weight: ${theme.typography.fontWeights.medium};
`;
