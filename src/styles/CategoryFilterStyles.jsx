import styled from 'styled-components/native';
import { theme } from './theme';

export const Container = styled.View`
  margin-bottom: ${theme.spacing.md}px;
  width: 100%;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.sm + 6}px ${theme.spacing.xl}px;
  border-radius: ${theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.background};
  font-size: ${theme.typography.fontSizes.lg}px;
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
  background-color: ${theme.colors.surface};
  border-radius: ${theme.spacing.md}px;
  padding: ${theme.spacing.xl}px;
  width: 90%;
  max-height: 80%;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-size: ${theme.typography.fontSizes.lg}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg}px;
  text-align: center;
`;

export const PickerContainer = styled.View`
  height: 50px;
  width: 100%;
  margin-bottom: ${theme.spacing.lg}px;
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: ${theme.colors.error};
  padding: ${theme.spacing.sm + 6}px ${theme.spacing.xl + 10}px;
  border-radius: ${theme.spacing.sm}px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const CloseButtonText = styled.Text`
  color: ${theme.colors.background};
  font-size: ${theme.typography.fontSizes.lg}px;
  text-align: center;
  flex-shrink: 0;
  width: 100%;
`;