import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';

export const AdminContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Header = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
  padding-top: ${(props) => props.theme.spacing.xl}px;
  background-color: ${(props) => props.theme.colors.surface};
`;

export const HeaderTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xxl}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

export const Section = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const FormContainer = styled.View`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing.lg}px;
`;

export const InputLabel = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.xs}px;
`;

export const Input = styled.TextInput`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.md}px;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`;

export const InputRow = styled.View`
  flex-direction: row;
  gap: ${(props) => props.theme.spacing.md}px;
`;

export const SmallInput = styled(Input)`
  flex: 1;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing.md}px;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.md}px;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
`;

export const OfferCard = styled.View`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing.md}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const OfferInfo = styled.View`
  flex: 1;
`;

export const OfferTitle = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  color: ${(props) => props.theme.colors.text};
`;

export const OfferDetails = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 4px;
`;

export const DiscountBadge = styled.View`
  background-color: ${(props) => props.theme.colors.success}20;
  padding: 4px 8px;
  border-radius: 8px;
`;

export const DiscountText = styled.Text`
  color: ${(props) => props.theme.colors.success};
  font-weight: ${(props) => props.theme.typography.fontWeights.bold};
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  gap: ${(props) => props.theme.spacing.sm}px;
`;

export const IconButton = styled.TouchableOpacity`
  padding: ${(props) => props.theme.spacing.sm}px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  margin-top: ${(props) => props.theme.spacing.xl}px;
`;