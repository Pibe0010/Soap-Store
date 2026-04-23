// src/services/index.js
// Re-export all services from the new modular structure
// This maintains backward compatibility with existing imports

export { supabase } from './supabaseClient';

// Products
export { getProducts, getProductById, getCategories } from './entities/productsService';

// Users
export { getUserById, getUserByEmail, createUser, updateUser, checkIsAdmin } from './entities/usersService';

// Addresses
export { 
  getAddressesByUserId, 
  getAddressById, 
  createAddress, 
  updateAddress, 
  deleteAddress 
} from './entities/addressesService';

// Favorites
export { 
  getFavoritesByUserId, 
  addFavorite, 
  removeFavorite, 
  isFavorite 
} from './entities/favoritesService';

// Orders
export { 
  getOrdersByUserId, 
  getOrderById, 
  createOrder, 
  updateOrder 
} from './entities/ordersService';

// Order Items
export { 
  getOrderItemsByOrderId, 
  createOrderItem, 
  updateOrderItem, 
  deleteOrderItem 
} from './entities/orderItemsService';

// Offers
export { 
  createOffer,
  getActiveOffers,
  getOffersByProduct,
  getAllOffers,
  updateOffer,
  deleteOffer,
  incrementSoldQuantity,
  checkOfferAvailable
} from './entities/offersService';

// Offer Purchases
export { 
  purchaseOffer,
  getUserPurchases,
  checkPurchaseLimit,
  getUserTotalSpentOnOffers,
  hasUserReachedLimit
} from './entities/offerPurchasesService';

// Cart
export { 
  getCartItems,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearUserCart,
  getCartItemCount,
  getCartTotal,
  mapCartItemFromDB
} from './entities/cartService';

// Auth
export { 
  signUpWithEmailPassword,
  signInWithEmailPassword,
  signInWithGoogle,
  signInWithApple,
  signOut,
  resetPasswordForEmail,
  verifyEmailOTP,
  sendMagicLinkEmail,
  getUser,
  updateUserPassword,
  getSession,
  resendVerificationEmail
} from './authService';