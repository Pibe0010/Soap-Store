import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const ToastContainer = styled.TouchableOpacity`
  position: absolute;
  top: 60px;
  left: ${(props) => props.theme.spacing.lg}px;
  right: ${(props) => props.theme.spacing.lg}px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.spacing.md}px;
  padding: ${(props) => props.theme.spacing.md}px ${(props) => props.theme.spacing.lg}px;
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
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

export const ToastAction = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  margin-left: ${(props) => props.theme.spacing.md}px;
  text-decoration-line: underline;
`;
