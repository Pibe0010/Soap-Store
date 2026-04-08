import React, { useState } from 'react';
import { Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { t } from '../constants/translations';
import {
  Container,
  Section,
  SectionTitle,
  FormContainer,
  InputLabel,
  Input,
  TextArea,
  ErrorText,
  SubmitButton,
  SubmitButtonText,
  InfoCard,
  InfoRow,
  InfoText,
  SocialContainer,
  SocialButton,
  ConfirmationText,
} from '../styles/ContactScreenStyles';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = 'info@soapstore.com';
const CONTACT_PHONE = '+1 (555) 123-4567';
const CONTACT_ADDRESS = '123 Green Lane, Nature City, NC 10001';

/**
 * Contact screen with a form, static business info, and social media links.
 * All text is in Spanish via centralized translations.
 * Form submission triggers a mailto: link with pre-populated fields.
 *
 * @returns {JSX.Element}
 */
export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  /**
   * Validates form fields and returns an error object.
   * @returns {Object} Field-level validation errors
   */
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = t.contact.nameRequired;
    if (!email.trim()) {
      newErrors.email = t.contact.emailRequired;
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = t.contact.emailInvalid;
    }
    if (!message.trim()) newErrors.message = t.contact.messageRequired;
    return newErrors;
  };

  /**
   * Handles form submission: validates, then opens mailto: with pre-populated fields.
   */
  const handleSubmit = () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const subject = encodeURIComponent(`Contact from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    );
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    Linking.openURL(mailtoUrl).catch(() => {
      Alert.alert(t.common.error, t.contact.error);
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setTimeout(() => setSubmitted(false), 3000);
  };

  /**
   * Opens a URL in the system browser.
   * @param {string} url - The URL to open
   */
  const openLink = (url) => {
    Linking.openURL(url).catch(() => {
      Alert.alert(t.common.error, t.contact.errorLink);
    });
  };

  return (
    <Container>
      <Section>
        <SectionTitle>{t.contact.title}</SectionTitle>

        <FormContainer>
          <InputLabel>{t.contact.name}</InputLabel>
          <Input
            placeholder={t.contact.name}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}

          <InputLabel>{t.contact.email}</InputLabel>
          <Input
            placeholder="tu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}

          <InputLabel>{t.contact.message}</InputLabel>
          <TextArea
            placeholder={t.contact.message}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />
          {errors.message && <ErrorText>{errors.message}</ErrorText>}

          <SubmitButton onPress={handleSubmit}>
            <SubmitButtonText>{t.contact.send}</SubmitButtonText>
          </SubmitButton>

          {submitted && (
            <ConfirmationText>
              {t.contact.confirmation}
            </ConfirmationText>
          )}
        </FormContainer>
      </Section>

      <Section>
        <SectionTitle>{t.contact.findUs}</SectionTitle>
        <InfoCard>
          <InfoRow onPress={() => openLink(`tel:${CONTACT_PHONE}`)}>
            <Ionicons name="call" size={22} color={theme.colors.primary} />
            <InfoText>{CONTACT_PHONE}</InfoText>
          </InfoRow>

          <InfoRow onPress={() => openLink(`mailto:${CONTACT_EMAIL}`)}>
            <Ionicons name="mail" size={22} color={theme.colors.primary} />
            <InfoText>{CONTACT_EMAIL}</InfoText>
          </InfoRow>

          <InfoRow activeOpacity={1}>
            <Ionicons name="location" size={22} color={theme.colors.primary} />
            <InfoText>{CONTACT_ADDRESS}</InfoText>
          </InfoRow>
        </InfoCard>
      </Section>

      <Section>
        <SectionTitle>{t.contact.followUs}</SectionTitle>
        <SocialContainer>
          <SocialButton
            onPress={() => openLink('https://instagram.com/soapstore')}
          >
            <Ionicons name="logo-instagram" size={28} color={theme.colors.primary} />
          </SocialButton>

          <SocialButton
            onPress={() => openLink('https://facebook.com/soapstore')}
          >
            <Ionicons name="logo-facebook" size={28} color={theme.colors.primary} />
          </SocialButton>

          <SocialButton
            onPress={() => openLink('https://wa.me/15551234567')}
          >
            <Ionicons name="logo-whatsapp" size={28} color={theme.colors.primary} />
          </SocialButton>
        </SocialContainer>
      </Section>
    </Container>
  );
}
