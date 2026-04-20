import styled from 'styled-components/native';

export const HelpContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.xl}px;
`;

export const HelpTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xxl}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
  text-align: center;
`;

export const HelpText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.md}px;
  margin-bottom: ${(props) => props.theme.spacing.xl}px;
  line-height: 24px;
`;

export const Section = styled.View`
  margin-bottom: ${(props) => props.theme.spacing.xl}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const FAQItem = styled.View`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing.md}px;
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`;

export const FAQQuestion = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FAQIcon = styled.View`
  margin-right: ${(props) => props.theme.spacing.sm}px;
`;

export const QuestionText = styled.Text`
  flex: 1;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

export const FAQAnswer = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: ${(props) => props.theme.spacing.sm}px;
  margin-left: 28px;
  line-height: 20px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) => props.theme.spacing.md}px;
  border-radius: 12px;
  gap: ${(props) => props.theme.spacing.sm}px;
`;

export const ActionButtonText = styled.Text`
  color: #fff;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
`;

export const LinkButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.colors.card};
  padding: ${(props) => props.theme.spacing.md}px;
  border-radius: 12px;
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
  gap: ${(props) => props.theme.spacing.sm}px;
`;

export const LinkButtonText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
`;