import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xl}px;
`;

export const Title = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xxl}px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
  margin-top: ${(props) => props.theme.spacing.lg}px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: ${(props) => props.theme.spacing.sm}px;
  text-align: center;
  flex-shrink: 1;
`;

export const Email = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  margin-top: ${(props) => props.theme.spacing.xs}px;
  text-align: center;
`;

export const Instruction = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: ${(props) => props.theme.spacing.xl}px;
  text-align: center;
  padding-horizontal: ${(props) => props.theme.spacing.lg}px;
  flex-shrink: 1;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${props => props.disabled ? props.theme.colors.disabled : props.theme.colors.primary};
  padding-vertical: ${(props) => props.theme.spacing.md}px;
  padding-horizontal: ${(props) => props.theme.spacing.xl}px;
  border-radius: 8px;
  margin-top: ${(props) => props.theme.spacing.xl}px;
  min-width: 250px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: 600;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: ${(props) => props.theme.spacing.lg}px;
  padding: ${(props) => props.theme.spacing.md}px;
`;

export const BackButtonText = styled.Text`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
`;
