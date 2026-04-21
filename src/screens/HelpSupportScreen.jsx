import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import {
  HelpSupportContainer,
  HelpSupportTitle,
  HelpSupportText,
  HelpSupportSection,
  HelpSupportSectionTitle,
  FAQItem,
  FAQQuestion,
  FAQIcon,
  QuestionText,
  FAQAnswer,
  ActionButton,
  ActionButtonText,
} from './HelpSupportScreenStyles';

/**
 * Help and Support screen - accessed from Settings
 * Similar to Help but without policy/terms links
 * Uses SafeAreaView for proper spacing
 * @returns {JSX.Element}
 */
export default function HelpSupportScreen() {
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.dark ? theme.colors.background : theme.colors.background}} edges={['top']}>
      <HelpSupportContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HelpSupportTitle>{t('ayuda.title')}</HelpSupportTitle>
          <HelpSupportText>{t('ayuda.body')}</HelpSupportText>

          {/* FAQ Section */}
          <HelpSupportSection>
            <HelpSupportSectionTitle>{t('ayuda.faq.title')}</HelpSupportSectionTitle>
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
          </HelpSupportSection>

          {/* Contact Button */}
          <HelpSupportSection>
            <ActionButton onPress={handleContactPress}>
              <Ionicons name="mail-outline" size={20} color="#fff" />
              <ActionButtonText>{t('ayuda.buttons.contact')}</ActionButtonText>
            </ActionButton>
          </HelpSupportSection>
        </ScrollView>
      </HelpSupportContainer>
    </SafeAreaView>
  );
}
