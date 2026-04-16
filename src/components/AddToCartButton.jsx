import React, { useContext } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Button, ButtonText, ButtonContent } from '../styles/AddToCartButtonStyles';
import NavigationContext from '../navigation/NavigationContext';


/**
 * Button component that adds a product to the shopping cart.
 * Auth-gated: shows a toast with login prompt if user is not logged in.
 * Calls CartContext.addItem() with the full product object on authenticated press.
 * Displays "Agregar al carrito" label with cart icon.
 *
 * @param {Object} props
 * @param {Object} props.product - Product object to add to cart (must include id, name, price)
 * @param {('small'|'medium')} [props.size='medium'] - Button size variant
 * @returns {JSX.Element}
 */
export default function AddToCartButton({ product, size = 'medium' }) {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigationRef = useContext(NavigationContext);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      showToast(t('toast.loginToAddCart'), t('toast.loginButton'), () => {
        // Login is inside HomeStack (InicioTab), so we need to navigate there properly
        // First navigate to InicioTab, then to Login
        const parent = navigationRef.current?.getParent();
        if (parent) {
          parent.navigate('InicioTab', { screen: 'Login' });
        } else {
          navigationRef.current?.navigate('Login');
        }
      });
      return;
    }
    addItem(product);
  };

  return (
    <Button onPress={handleAddToCart} size={size}>
      <ButtonContent>
        <Ionicons name="cart-outline" size={size === 'small' ? 16 : 20} color="white" />
        <ButtonText size={size}>{t('addToCart')}</ButtonText>
      </ButtonContent>
    </Button>
  );
}
