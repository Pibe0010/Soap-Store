import React from 'react';
import { useState } from 'react';
import { Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { Container, Button, ButtonText, ModalBackground, ModalContent, ModalTitle, PickerContainer, CloseButton, CloseButtonText } from '../styles/CategoryFilterStyles';

/**
 * Category filter component with modal picker for selecting product categories.
 * All text is in Spanish via centralized translations.
 *
 * @param {Object} props
 * @param {string[]} [props.categories=[]] - Available category options
 * @param {string} props.selectedCategory - Currently selected category
 * @param {Function} props.onCategoryChange - Callback fired when category selection changes
 * @returns {JSX.Element}
 */
export default function CategoryFilter({ categories = [], selectedCategory, onCategoryChange }) {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCategorySelect = (category) => {
    setModalVisible(false);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <Container>
      <Button onPress={() => setModalVisible(true)}>
        <ButtonText>{selectedCategory}</ButtonText>
      </Button>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
      >
        <ModalBackground>
          <ModalContent>
            <ModalTitle>{t('products.selectCategory')}</ModalTitle>
            <PickerContainer>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  handleCategorySelect(itemValue)
                }
              >
                <Picker.Item label={t('products.allCategories')} value={t('products.allCategories')} />
                {Array.isArray(categories) && categories.map((category) => (
                  <Picker.Item
                    key={category}
                    label={category}
                    value={category}
                  />
                ))}
              </Picker>
            </PickerContainer>
            <CloseButton onPress={() => setModalVisible(false)}>
              <CloseButtonText>{t('products.close')}</CloseButtonText>
            </CloseButton>
          </ModalContent>
        </ModalBackground>
      </Modal>
    </Container>
  );
}
