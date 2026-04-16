import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.spacing.sm}px;
  padding: ${(props) => props.theme.spacing.md}px;
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
  width: 100%;
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`;

export const Content = styled.View`
  gap: ${(props) => props.theme.spacing.xs}px;
`;

export const Title = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  color: ${(props) => props.theme.colors.text};
`;

export const Category = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  flex-wrap: wrap;
  flex: 1;
`;

export const Label = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xs}px;
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const Price = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.primary};
`;

export const ButtonContainer = styled.View`
  margin-top: ${(props) => props.theme.spacing.sm}px;
`;