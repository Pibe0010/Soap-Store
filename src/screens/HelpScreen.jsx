import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';
import { HelpContainer, HelpTitle, HelpText } from './HelpScreenStyles';

/**
 * Help screen with centered title and body text.
 * Uses Styled Components with adequate padding (24dp horizontal, 24dp container).
 * @returns {JSX.Element}
 */
export default function HelpScreen() {
  const { t } = useTranslation();
  return (
    <HelpContainer>
      <Ionicons name="help-circle-outline" size={80} color={theme.colors.disabled} />
      <HelpTitle>{t('ayuda.title')}</HelpTitle>
      <HelpText>{t('ayuda.body')}</HelpText>
    </HelpContainer>
  );
}
