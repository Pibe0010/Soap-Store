import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.disabled ? props.theme.colors.disabled : props.theme.colors.primary};
  padding: ${props => props.size === 'small' ? props.theme.spacing.sm : props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
  width: 100%;
  opacity: ${(props) => props.disabled ? 0.6 : 1};
`;

export const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm}px;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.background};
  font-size: ${props => props.size === 'small' ? props.theme.typography.fontSizes.sm : props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  text-align: center;
`;