import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import {
  OfferCardWrapper,
  OfferHeader,
  OfferInfo,
  RowWrap,
  OfferTitle,
  DiscountBadge,
  DiscountBadgeText,
  OfferDetails,
  ActionButtons,
  IconButton,
  StatusBadge,
  StatusText,
} from '../styles/AdminOffersStyles';

export default function OfferCard({ offer, onToggleActive, onDelete }) {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <OfferCardWrapper>
      <OfferHeader>
        <OfferInfo>
          <RowWrap>
            <OfferTitle>{offer.products?.name || 'Producto'}</OfferTitle>
            {offer.discount_percentage > 0 && (
              <DiscountBadge>
                <DiscountBadgeText>-{offer.discount_percentage}%</DiscountBadgeText>
              </DiscountBadge>
            )}
          </RowWrap>
          <OfferDetails>
            {t('ofertas.currency')}{offer.original_price} → {t('ofertas.currency')}{offer.offer_price}
          </OfferDetails>
          <OfferDetails>
            {t('ofertas.vendida')}: {offer.sold_quantity}/{offer.max_total_quantity}
          </OfferDetails>
          <OfferDetails>
            {t('ofertas.fechaFin')}: {new Date(offer.end_date).toLocaleDateString()}
          </OfferDetails>
        </OfferInfo>
        <StatusBadge active={offer.is_active}>
          <StatusText active={offer.is_active}>
            {offer.is_active ? t('ofertas.activa') : t('ofertas.inactiva')}
          </StatusText>
        </StatusBadge>
      </OfferHeader>
      <ActionButtons>
        <IconButton onPress={() => onToggleActive(offer)}>
          <Ionicons
            name={offer.is_active ? 'eye-off-outline' : 'eye-outline'}
            size={18}
            color={theme.colors.text}
          />
        </IconButton>
        <IconButton onPress={() => onDelete(offer.id)}>
          <Ionicons name="trash-outline" size={18} color={theme.colors.error} />
        </IconButton>
      </ActionButtons>
    </OfferCardWrapper>
  );
}