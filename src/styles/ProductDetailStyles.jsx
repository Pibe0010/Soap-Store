import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.md}px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const Content = styled.View`
  gap: ${(props) => props.theme.spacing.sm}px;
`;

export const Title = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xl}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

export const Category = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.textSecondary};
  flex-wrap: wrap;
  flex: 1;
`;

export const Label = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

export const Description = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
  line-height: ${(props) => props.theme.typography.fontSizes.md * 1.5}px;
`;

export const Price = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xxl}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.primary};
`;

export const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.error};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.lg}px;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
`;

export const RetryText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.sm}px;
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
`;

export const BackText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.lg}px;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
`;

export const ButtonContainer = styled.View`
  margin-top: ${(props) => props.theme.spacing.md}px;
`;