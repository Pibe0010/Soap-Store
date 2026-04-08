import styled from 'styled-components/native';
import { theme } from '../styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.md}px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl}px;
`;

export const EmptyText = styled.Text`
  font-size: ${theme.typography.fontSizes.xl}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-top: ${theme.spacing.lg}px;
`;

export const EmptySubtext = styled.Text`
  font-size: ${theme.typography.fontSizes.md}px;
  color: ${theme.colors.disabled};
  text-align: center;
  margin-top: ${theme.spacing.sm}px;
`;

export const FavoriteItem = styled.View`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.spacing.sm}px;
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.sm}px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const FavoriteImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: ${theme.spacing.sm}px;
  margin-right: ${theme.spacing.md}px;
`;

export const FavoriteInfo = styled.View`
  flex: 1;
`;

export const FavoriteName = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text};
`;

export const FavoritePrice = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary};
  margin-top: ${theme.spacing.xs}px;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
`;

export const RemoveText = styled.Text`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSizes.sm}px;
  font-weight: ${theme.typography.fontWeights.medium};
`;
