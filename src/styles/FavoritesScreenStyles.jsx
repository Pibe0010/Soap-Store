import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.md}px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xl}px;
`;

export const EmptyText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xl}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.lg}px;
`;

export const EmptySubtext = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.disabled};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.sm}px;
`;

export const FavoriteItem = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.md}px;
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const FavoriteImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  margin-right: ${(props) => props.theme.spacing.md}px;
`;

export const FavoriteInfo = styled.View`
  flex: 1;
`;

export const FavoriteName = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  color: ${(props) => props.theme.colors.text};
`;

export const FavoritePrice = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.primary};
  margin-top: ${(props) => props.theme.spacing.xs}px;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: ${(props) => props.theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
`;

export const RemoveText = styled.Text`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;
