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

export const AvatarContainer = styled.View`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  background-color: ${theme.colors.surface};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md}px;
  border-width: 3px;
  border-color: ${theme.colors.surface};
`;

export const UserName = styled.Text`
  font-size: ${theme.typography.fontSizes.xl}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.white};
  margin-bottom: 4px;
`;

export const UserEmail = styled.Text`
  font-size: ${theme.typography.fontSizes.sm}px;
  color: ${theme.colors.white}dd;
  width: 50%;
`;

export const StatsContainer = styled.View`
  flex-direction: row;
  background-color: ${theme.colors.surface};
  margin: ${theme.spacing.lg}px;
  margin-top: -${theme.spacing.lg}px;
  border-radius: ${theme.spacing.md}px;
  padding: ${theme.spacing.md}px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const StatItem = styled.View`
  flex: 1;
  align-items: center;
`;

export const StatValue = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text};
`;

export const StatLabel = styled.Text`
  font-size: ${theme.typography.fontSizes.xs}px;
  color: ${theme.colors.textSecondary};
  margin-top: 2px;
`;

export const Section = styled.View`
  margin-horizontal: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
  background-color: ${theme.colors.surface};
  border-radius: ${theme.spacing.sm}px;
  overflow: hidden;
`;

export const SectionTitle = styled.Text`
  font-size: ${theme.typography.fontSizes.sm}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.sm}px;
  margin-horizontal: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.md}px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.textSecondary}10;
`;

export const MenuItemIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) => props.bgColor || theme.colors.primary + '20'};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

export const MenuItemText = styled.Text`
  flex: 1;
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.text};
`;

export const MenuItemArrow = styled.View``;

export const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.lg}px;
  padding: ${theme.spacing.md}px;
  background-color: ${theme.colors.error}15;
  border-radius: ${theme.spacing.sm}px;
`;

export const LogoutText = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.error};
  margin-left: ${theme.spacing.sm}px;
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
