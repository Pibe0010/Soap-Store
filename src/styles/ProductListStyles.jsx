import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.md}px;
`;

export const ListContentContainer = styled.View`
  padding-bottom: ${(props) => props.theme.spacing.lg}px;
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

export const EmptyText = styled.Text`
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.lg}px;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
`;