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

export const HeaderTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xl}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.white};
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
  min-height: 56px;
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

export const LanguageButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.textSecondary}10;
  min-height: 56px;
`;

export const LanguageText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: right;
  flex-shrink: 1;
  min-width: 80px;
  margin-right: ${(props) => props.theme.spacing.sm}px;
`;

export const LanguageArrow = styled.View`
  width: 20px;
  align-items: center;
`;

export const ToggleContainer = styled.View`
  margin-left: ${(props) => props.theme.spacing.sm}px;
`;

export const ToggleSwitch = styled.TouchableOpacity`
  width: 50px;
  height: 28px;
  border-radius: 14px;
  background-color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.disabled)};
  justify-content: center;
  padding-horizontal: 2px;
`;
