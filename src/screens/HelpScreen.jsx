import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import {
  HelpContainer,
  HelpTitle,
  HelpText,
  Section,
  SectionTitle,
  FAQItem,
  FAQQuestion,
  FAQIcon,
  QuestionText,
  FAQAnswer,
  ActionButton,
  ActionButtonText,
  LinkButton,
  LinkButtonText,
} from './HelpScreenStyles';

/**
 * Help screen with FAQ accordion, contact button, and useful links.
 * @returns {JSX.Element}
 */
export default function HelpScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    { key: 'howToOrder', question: t('ayuda.faq.howToOrder'), answer: t('ayuda.faq.howToOrderAnswer') },
    { key: 'howToTrack', question: t('ayuda.faq.howToTrack'), answer: t('ayuda.faq.howToTrackAnswer') },
    { key: 'paymentMethods', question: t('ayuda.faq.paymentMethods'), answer: t('ayuda.faq.paymentMethodsAnswer') },
    { key: 'returns', question: t('ayuda.faq.returns'), answer: t('ayuda.faq.returnsAnswer') },
  ];

  const toggleFAQ = (key) => {
    setExpandedFAQ(expandedFAQ === key ? null : key);
  };

  const handleContactPress = () => {
    navigation.navigate('ContactScreen');
  };

  const handleLinkPress = (url, fallbackMessage) => {
    Linking.openURL(url).catch(() => {
      Alert.alert(t('common.error'), fallbackMessage);
    });
  };

  return (
    <HelpContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HelpTitle>{t('ayuda.title')}</HelpTitle>
        <HelpText>{t('ayuda.body')}</HelpText>

        {/* FAQ Section */}
        <Section>
          <SectionTitle>{t('ayuda.faq.title')}</SectionTitle>
          {faqs.map((faq) => (
            <FAQItem key={faq.key}>
              <TouchableOpacity onPress={() => toggleFAQ(faq.key)}>
                <FAQQuestion>
                  <FAQIcon>
                    <Ionicons
                      name={expandedFAQ === faq.key ? 'remove' : 'add'}
                      size={20}
                      color={theme.colors.primary}
                    />
                  </FAQIcon>
                  <QuestionText>{faq.question}</QuestionText>
                </FAQQuestion>
              </TouchableOpacity>
              {expandedFAQ === faq.key && (
                <FAQAnswer>{faq.answer}</FAQAnswer>
              )}
            </FAQItem>
          ))}
        </Section>

        {/* Contact Button */}
        <Section>
          <ActionButton onPress={handleContactPress}>
            <Ionicons name="mail-outline" size={20} color="#fff" />
            <ActionButtonText>{t('ayuda.buttons.contact')}</ActionButtonText>
          </ActionButton>
        </Section>

        {/* Links Section */}
        <Section>
          <LinkButton onPress={() => handleLinkPress('https://soapstore.com/privacy', t('contact.errorLink'))}>
            <Ionicons name="shield-checkmark-outline" size={20} color={theme.colors.primary} />
            <LinkButtonText>{t('ayuda.buttons.privacy')}</LinkButtonText>
          </LinkButton>

          <LinkButton onPress={() => handleLinkPress('https://soapstore.com/terms', t('contact.errorLink'))}>
            <Ionicons name="document-text-outline" size={20} color={theme.colors.primary} />
            <LinkButtonText>{t('ayuda.buttons.terms')}</LinkButtonText>
          </LinkButton>
        </Section>
      </ScrollView>
    </HelpContainer>
  );
}