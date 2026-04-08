import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { t } from '../constants/translations';
import { theme } from '../styles/theme';
import {
  Container,
  Header,
  HeaderTitle,
  Section,
  SectionTitle,
  MenuItem,
  MenuItemIcon,
  MenuItemText,
  MenuItemArrow,
  ToggleContainer,
  ToggleSwitch,
  LanguageButton,
  LanguageText,
  LanguageArrow,
} from '../styles/SettingsScreenStyles';

const LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇦🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
];

/**
 * App settings screen with language, notifications, and preferences.
 *
 * @returns {JSX.Element}
 */
export default function SettingsScreen() {
  const navigation = useNavigation();
  const [language, setLanguage] = useState('es');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLanguagePress = () => {
    const currentLang = LANGUAGES.find(l => l.code === language);
    const options = LANGUAGES.map(l => l.label).join(', ');
    Alert.alert(
      t.ajustes.menu.language,
      `${t.ajustes.menu.selectLanguage}\n\n${options}`,
      LANGUAGES.map((lang) => ({
        text: `${lang.flag} ${lang.label}`,
        onPress: () => {
          setLanguage(lang.code);
          // TODO: Implement actual language switching
        },
      }))
    );
  };

  const currentLang = LANGUAGES.find(l => l.code === language);

  return (
    <Container>
      <Header>
        <HeaderTitle>{t.ajustes.title}</HeaderTitle>
      </Header>

      <SectionTitle>{t.ajustes.sections.general}</SectionTitle>
      <Section>
        <LanguageButton onPress={handleLanguagePress}>
          <MenuItemIcon bgColor={theme.colors.accent + '20'}>
            <Ionicons name="language-outline" size={22} color={theme.colors.accent} />
          </MenuItemIcon>
          <MenuItemText>{t.ajustes.menu.language}</MenuItemText>
          <LanguageText>{currentLang?.flag} {currentLang?.label}</LanguageText>
          <LanguageArrow>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </LanguageArrow>
        </LanguageButton>

        <MenuItem onPress={() => setDarkMode(!darkMode)}>
          <MenuItemIcon bgColor={theme.colors.textSecondary + '20'}>
            <Ionicons name="moon-outline" size={22} color={theme.colors.textSecondary} />
          </MenuItemIcon>
          <MenuItemText>{t.ajustes.menu.darkMode}</MenuItemText>
          <ToggleContainer>
            <ToggleSwitch active={darkMode} onPress={() => setDarkMode(!darkMode)} />
          </ToggleContainer>
        </MenuItem>
      </Section>

      <SectionTitle>{t.ajustes.sections.notifications}</SectionTitle>
      <Section>
        <MenuItem onPress={() => setNotificationsEnabled(!notificationsEnabled)}>
          <MenuItemIcon bgColor={theme.colors.warning + '20'}>
            <Ionicons name="notifications-outline" size={22} color={theme.colors.warning} />
          </MenuItemIcon>
          <MenuItemText>{t.ajustes.menu.pushNotifications}</MenuItemText>
          <ToggleContainer>
            <ToggleSwitch active={notificationsEnabled} onPress={() => setNotificationsEnabled(!notificationsEnabled)} />
          </ToggleContainer>
        </MenuItem>

        <MenuItem onPress={() => setDarkMode(!darkMode)}>
          <MenuItemIcon bgColor={theme.colors.info + '20'}>
            <Ionicons name="mail-outline" size={22} color={theme.colors.info} />
          </MenuItemIcon>
          <MenuItemText>{t.ajustes.menu.emailNotifications}</MenuItemText>
          <ToggleContainer>
            <ToggleSwitch active={notificationsEnabled} onPress={() => setNotificationsEnabled(!notificationsEnabled)} />
          </ToggleContainer>
        </MenuItem>
      </Section>

      <SectionTitle>{t.ajustes.sections.about}</SectionTitle>
      <Section>
        <MenuItem>
          <MenuItemIcon bgColor={theme.colors.success + '20'}>
            <Ionicons name="information-circle-outline" size={22} color={theme.colors.success} />
          </MenuItemIcon>
          <MenuItemText>{t.ajustes.menu.version}</MenuItemText>
          <LanguageText>1.0.0</LanguageText>
        </MenuItem>

        <MenuItem onPress={() => navigation.navigate('Help')}>
          <MenuItemIcon bgColor={theme.colors.primary + '20'}>
            <Ionicons name="help-circle-outline" size={22} color={theme.colors.primary} />
          </MenuItemIcon>
          <MenuItemText>{t.ajustes.menu.help}</MenuItemText>
          <MenuItemArrow>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </MenuItemArrow>
        </MenuItem>

        <MenuItem onPress={() => navigation.navigate('ContactScreen')}>
          <MenuItemIcon bgColor={theme.colors.error + '20'}>
            <Ionicons name="shield-checkmark-outline" size={22} color={theme.colors.error} />
          </MenuItemIcon>
          <MenuItemText>{t.ajustes.menu.privacy}</MenuItemText>
          <MenuItemArrow>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </MenuItemArrow>
        </MenuItem>
      </Section>
    </Container>
  );
}
