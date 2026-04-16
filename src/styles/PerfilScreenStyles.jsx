import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 24 },
})`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.xl}px;
  padding-top: ${(props) => props.theme.spacing.xl + 20}px;
  align-items: center;
`;

export const AvatarContainer = styled.View`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  background-color: ${(props) => props.theme.colors.surface};
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  border-width: 3px;
  border-color: ${(props) => props.theme.colors.surface};
`;

export const UserName = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xl}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 4px;
`;

export const UserEmail = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.white}dd;
  width: 50%;
`;

export const StatsContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.surface};
  margin: ${(props) => props.theme.spacing.lg}px;
  margin-top: -${(props) => props.theme.spacing.lg}px;
  border-radius: ${(props) => props.theme.spacing.md}px;
  padding: ${(props) => props.theme.spacing.md}px;
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
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

export const StatLabel = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xs}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 2px;
`;

export const Section = styled.View`
  margin-horizontal: ${(props) => props.theme.spacing.md}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.spacing.sm}px;
  overflow: hidden;
`;

export const SectionTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
  margin-horizontal: ${(props) => props.theme.spacing.md}px;
  margin-top: ${(props) => props.theme.spacing.md}px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.textSecondary}10;
`;

export const MenuItemIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) => props.bgColor || props.theme.colors.primary + '20'};
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => props.theme.spacing.md}px;
`;

export const MenuItemText = styled.Text`
  flex: 1;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
`;

export const MenuItemArrow = styled.View``;

export const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.theme.spacing.md}px;
  margin-top: ${(props) => props.theme.spacing.lg}px;
  padding: ${(props) => props.theme.spacing.md}px;
  background-color: ${(props) => props.theme.colors.error}15;
  border-radius: ${(props) => props.theme.spacing.sm}px;
`;

export const LogoutText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  color: ${(props) => props.theme.colors.error};
  margin-left: ${(props) => props.theme.spacing.sm}px;
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
