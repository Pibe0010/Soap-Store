import React from 'react';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';
import ToggleSwitch from '../components/ToggleSwitch';
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
  LanguageButton,
  LanguageText,
  LanguageArrow,
} from '../styles/SettingsScreenStyles';

/**
 * App settings screen with language, notifications, and preferences.
 *
 * @returns {JSX.Element}
 */
export default function SettingsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { theme, isDarkMode, setDarkMode } = useTheme();
  const { 
    pushEnabled, 
    emailEnabled, 
    permissionsGranted,
    isExpoGo,
    setPushEnabled, 
    setEmailEnabled,
    requestPermissions 
  } = useNotifications();

  // Get app version from expo-constants
  const appVersion = Constants?.expoConfig?.version || Constants?.manifest?.version || '1.0.0';

  const languages = [
    { code: 'es', label: t('languages.es') },
    { code: 'en', label: t('languages.en') },
  ];

  const handleLanguagePress = () => {
    const options = languages.map(l => l.label).join(', ');
    Alert.alert(
      t('ajustes.menu.language'),
      `${t('ajustes.menu.selectLanguage')}`,
      languages.map((lang) => ({
        text: lang.label,
        onPress: () => {
          changeLanguage(lang.code);
        },
      }))
    );
  };

  const currentLang = languages.find(l => l.code === language);

  const handleDarkModeToggle = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>{t('ajustes.title')}</HeaderTitle>
      </Header>

      <SectionTitle>{t('ajustes.sections.general')}</SectionTitle>
      <Section>
        <LanguageButton onPress={handleLanguagePress}>
          <MenuItemIcon bgColor={theme.colors.accent + '20'}>
            <Ionicons name="language-outline" size={22} color={theme.colors.accent} />
          </MenuItemIcon>
          <MenuItemText>{t('ajustes.menu.language')}</MenuItemText>
          <LanguageText>{currentLang?.label}</LanguageText>
          <LanguageArrow>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </LanguageArrow>
        </LanguageButton>

        <MenuItem onPress={handleDarkModeToggle}>
          <MenuItemIcon bgColor={theme.colors.textSecondary + '20'}>
            <Ionicons name="moon-outline" size={22} color={theme.colors.textSecondary} />
          </MenuItemIcon>
          <MenuItemText>{t('ajustes.menu.darkMode')}</MenuItemText>
          <ToggleContainer>
            <ToggleSwitch 
              active={isDarkMode} 
              onPress={handleDarkModeToggle} 
            />
          </ToggleContainer>
        </MenuItem>
      </Section>

      <SectionTitle>{t('ajustes.sections.notifications')}</SectionTitle>
      <Section>
        <MenuItem onPress={async () => {
          if (!permissionsGranted && !isExpoGo) {
            const granted = await requestPermissions();
            if (granted) {
              setPushEnabled(true);
            }
          } else if (isExpoGo) {
            Alert.alert(
              t('ajustes.notifications.unavailable'),
              t('ajustes.notifications.unavailableMessage')
            );
          } else {
            setPushEnabled(!pushEnabled);
          }
        }}>
          <MenuItemIcon bgColor={theme.colors.warning + '20'}>
            <Ionicons name="notifications-outline" size={22} color={theme.colors.warning} />
          </MenuItemIcon>
          <MenuItemText>{t('ajustes.menu.pushNotifications')}</MenuItemText>
          <ToggleContainer>
            <ToggleSwitch 
              active={pushEnabled} 
              onPress={async () => {
                if (!permissionsGranted && !isExpoGo) {
                  const granted = await requestPermissions();
                  if (granted) {
                    setPushEnabled(true);
                  }
                } else if (isExpoGo) {
                  Alert.alert(
                    t('ajustes.notifications.unavailable'),
                    t('ajustes.notifications.unavailableMessage')
                  );
                } else {
                  setPushEnabled(!pushEnabled);
                }
              }} 
            />
          </ToggleContainer>
        </MenuItem>

        <MenuItem onPress={() => setEmailEnabled(!emailEnabled)}>
          <MenuItemIcon bgColor={theme.colors.info + '20'}>
            <Ionicons name="mail-outline" size={22} color={theme.colors.info} />
          </MenuItemIcon>
          <MenuItemText>{t('ajustes.menu.emailNotifications')}</MenuItemText>
          <ToggleContainer>
            <ToggleSwitch 
              active={emailEnabled} 
              onPress={() => setEmailEnabled(!emailEnabled)} 
            />
          </ToggleContainer>
        </MenuItem>
      </Section>

      <SectionTitle>{t('ajustes.sections.about')}</SectionTitle>
      <Section>
        <MenuItem>
          <MenuItemIcon bgColor={theme.colors.success + '20'}>
            <Ionicons name="information-circle-outline" size={22} color={theme.colors.success} />
          </MenuItemIcon>
          <MenuItemText>{t('ajustes.menu.version')}</MenuItemText>
          <LanguageText>{appVersion}</LanguageText>
        </MenuItem>

        <MenuItem onPress={() => navigation.navigate('AppStack', { screen: 'HelpScreen' })}>
          <MenuItemIcon bgColor={theme.colors.primary + '20'}>
            <Ionicons name="help-circle-outline" size={22} color={theme.colors.primary} />
          </MenuItemIcon>
          <MenuItemText>{t('ajustes.menu.help')}</MenuItemText>
          <MenuItemArrow>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </MenuItemArrow>
        </MenuItem>

        <MenuItem onPress={() => navigation.navigate('AppStack', { screen: 'ContactScreen' })}>
          <MenuItemIcon bgColor={theme.colors.error + '20'}>
            <Ionicons name="shield-checkmark-outline" size={22} color={theme.colors.error} />
          </MenuItemIcon>
          <MenuItemText>{t('ajustes.menu.privacy')}</MenuItemText>
          <MenuItemArrow>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </MenuItemArrow>
        </MenuItem>
      </Section>
    </Container>
  );
}