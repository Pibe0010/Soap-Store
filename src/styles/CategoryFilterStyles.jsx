import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  width: 100%;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.sm + 6}px ${(props) => props.theme.spacing.xl}px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.background};
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  text-align: center;
  flex-shrink: 0;
  width: 100%;
`;

export const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.spacing.md}px;
  padding: ${(props) => props.theme.spacing.xl}px;
  width: 90%;
  max-height: 80%;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
  text-align: center;
`;

export const PickerContainer = styled.View`
  height: 50px;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.lg}px;
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.error};
  padding: ${(props) => props.theme.spacing.sm + 6}px ${(props) => props.theme.spacing.xl + 10}px;
  border-radius: ${(props) => props.theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const CloseButtonText = styled.Text`
  color: ${(props) => props.theme.colors.background};
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  text-align: center;
  flex-shrink: 0;
  width: 100%;
`;