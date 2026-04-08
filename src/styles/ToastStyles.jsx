import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { theme } from './theme';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const ToastContainer = styled.TouchableOpacity`
  position: absolute;
  top: 60px;
  left: ${theme.spacing.lg}px;
  right: ${theme.spacing.lg}px;
  background-color: ${theme.colors.primary};
  border-radius: ${theme.spacing.md}px;
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 2000;
  elevation: 10;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
`;

export const ToastMessage = styled.Text`
  flex: 1;
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.md}px;
  font-weight: ${theme.typography.fontWeights.medium};
`;

export const ToastAction = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.md}px;
  font-weight: ${theme.typography.fontWeights.bold};
  margin-left: ${theme.spacing.md}px;
  text-decoration-line: underline;
`;
