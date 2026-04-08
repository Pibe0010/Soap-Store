import { useState, useEffect, useCallback } from 'react';
import { 
  getOrdersByUserId, 
  getOrderById, 
  createOrder, 
  updateOrder,
  getOrderItemsByOrderId
} from '../services/supabase';
import { useAuth } from '../context/AuthContext';

/**
 * Hook for managing user orders
 * 
 * @returns {Object} Orders state and CRUD operations
 */
export const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  // Load orders when user changes
  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const loadOrders = async () => {
      try {
        setLoading(true);
        const { data, total } = await getOrdersByUserId(user.id);
        setOrders(data || []);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  // Load order details when orderId changes
  useEffect(() => {
    if (orderDetails?.id) {
      const loadOrderItems = async () => {
        try {
          const items = await getOrderItemsByOrderId(orderDetails.id);
          setOrderItems(items || []);
        } catch (err) {
          console.error('Error loading order items:', err);
        }
      };
      
      loadOrderItems();
    }
  }, [orderDetails]);

  const getOrderByIdFn = useCallback(async (id: string) => {
    if (!user) return null;

    try {
      setLoading(true);
      const order = await getOrderById(id);
      setOrderDetails(order);
      setLoading(false);
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load order');
      setLoading(false);
      throw err;
    }
  }, [user]);

  const createOrderFn = useCallback(async (orderData: any) => {
    if (!user) return null;

    try {
      const newOrder = await createOrder({
        ...orderData,
        userId: user.id
      });
      
      // Add to local state
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
      throw err;
    }
  }, [user]);

  const updateOrderFn = useCallback(async (id: string, orderData: any) => {
    if (!user) return null;

    try {
      const updatedOrder = await updateOrder(id, {
        ...orderData
      });
      
      // Update local state
      setOrders(prev => 
        prev.map(order => order.id === id ? updatedOrder : order)
      );
      
      // Update details if currently viewing this order
      if (orderDetails?.id === id) {
        setOrderDetails(updatedOrder);
      }
      
      return updatedOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order');
      throw err;
    }
  }, [user]);

  return {
    orders,
    orderDetails,
    orderItems,
    loading,
    error,
    getOrderById: getOrderByIdFn,
    createOrder: createOrderFn,
    updateOrder: updateOrderFn,
    // Helper methods
    getOrderTotal: (order: any) => order?.total || 0,
    getOrderItemsCount: (items: any[]) => 
      items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0
  };
};

export default useOrders;