import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.xl}px;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
`;

export const BackButton = styled.TouchableOpacity`
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
  padding: ${(props) => props.theme.spacing.sm}px;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xxl}px;
`;

export const Title = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xxl}px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
  margin-top: ${(props) => props.theme.spacing.md}px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: ${(props) => props.theme.spacing.sm}px;
  text-align: center;
  padding-horizontal: ${(props) => props.theme.spacing.lg}px;
  flex-shrink: 1;
`;

export const Form = styled.View`
  width: 100%;
`;

export const HintContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const HintIcon = styled.View`
  margin-right: ${(props) => props.theme.spacing.xs}px;
`;

export const HintText = styled.Text`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  flex: 1;
  flex-shrink: 1;
`;

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.error}15;
  padding: ${(props) => props.theme.spacing.md}px;
  border-radius: 8px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const ErrorIcon = styled.View`
  margin-right: ${(props) => props.theme.spacing.sm}px;
`;

export const ErrorText = styled.Text`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  flex: 1;
  flex-shrink: 1;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${props => props.disabled ? props.theme.colors.disabled : props.theme.colors.primary};
  padding-vertical: ${(props) => props.theme.spacing.md}px;
  border-radius: 8px;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.md}px;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: 600;
`;
