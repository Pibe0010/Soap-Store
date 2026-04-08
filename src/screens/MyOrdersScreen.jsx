import React, { useState } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '../hooks/useOrders';
import { t } from '../constants/translations';
import { theme } from '../styles/theme';
import {
  Container,
  EmptyContainer,
  EmptyText,
  EmptySubtext,
  OrderCard,
  OrderHeader,
  OrderInfo,
  OrderDate,
  OrderTotal,
  OrderItemsCount,
  StatusBadge,
  StatusText,
  OrderDetails,
  OrderItemRow,
  OrderItemImage,
  OrderItemInfo,
  OrderItemName,
  OrderItemQuantity,
  OrderItemPrice,
  ExpandIcon,
} from '../styles/MyOrdersScreenStyles';

const STATUS_CONFIG = {
  pending: { label: t.pedidos.status.pending, color: '#F59E0B', bgColor: '#FEF3C7' },
  processing: { label: t.pedidos.status.processing, color: '#3B82F6', bgColor: '#DBEAFE' },
  shipped: { label: t.pedidos.status.shipped, color: '#8B5CF6', bgColor: '#EDE9FE' },
  delivered: { label: t.pedidos.status.delivered, color: '#10B981', bgColor: '#D1FAE5' },
  cancelled: { label: t.pedidos.status.cancelled, color: '#EF4444', bgColor: '#FEE2E2' },
};

/**
 * Screen displaying the user's order history.
 * Shows a list of orders with status badges, totals, and dates.
 * Tapping an order expands to show individual items.
 *
 * @returns {JSX.Element}
 */
export default function MyOrdersScreen() {
  const { orders, orderItems, getOrderById, loading } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const handleToggleOrder = async (order) => {
    if (expandedOrderId === order.id) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(order.id);
      await getOrderById(order.id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusConfig = (status) => {
    return STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  };

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.primary} style={{ flex: 1 }} />
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyContainer>
        <Ionicons name="receipt-outline" size={80} color={theme.colors.disabled} />
        <EmptyText>{t.pedidos.empty}</EmptyText>
        <EmptySubtext>{t.pedidos.emptySubtitle}</EmptySubtext>
      </EmptyContainer>
    );
  }

  const renderOrder = ({ item: order }) => {
    const isExpanded = expandedOrderId === order.id;
    const statusConfig = getStatusConfig(order.status);

    return (
      <OrderCard onPress={() => handleToggleOrder(order)} activeOpacity={0.7}>
        <OrderHeader>
          <OrderInfo>
            <OrderDate>{formatDate(order.createdAt)}</OrderDate>
            <OrderTotal>${order.total?.toFixed(2) || '0.00'}</OrderTotal>
            <OrderItemsCount>
              {t.pedidos.orderNumber} #{order.id.slice(0, 8)}
            </OrderItemsCount>
          </OrderInfo>
          <StatusBadge bgColor={statusConfig.bgColor}>
            <StatusText textColor={statusConfig.color}>
              {statusConfig.label}
            </StatusText>
          </StatusBadge>
        </OrderHeader>

        {isExpanded && orderItems.length > 0 && (
          <OrderDetails>
            {orderItems.map((item) => (
              <OrderItemRow key={item.id}>
                <OrderItemImage
                  source={{ uri: item.product?.imageUrl || '' }}
                />
                <OrderItemInfo>
                  <OrderItemName>{item.product?.name || 'Producto'}</OrderItemName>
                  <OrderItemQuantity>
                    Cantidad: {item.quantity}
                  </OrderItemQuantity>
                </OrderItemInfo>
                <OrderItemPrice>
                  ${(item.totalPrice || item.unitPrice * item.quantity)?.toFixed(2) || '0.00'}
                </OrderItemPrice>
              </OrderItemRow>
            ))}
          </OrderDetails>
        )}

        {isExpanded && orderItems.length === 0 && (
          <OrderDetails>
            <EmptySubtext>Cargando detalles...</EmptySubtext>
          </OrderDetails>
        )}
      </OrderCard>
    );
  };

  return (
    <Container>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </Container>
  );
}
