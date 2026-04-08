/**
 * Centralized Spanish translations for the Soap Store app.
 * All user-facing strings are defined here to ensure consistency
 * and simplify future locale expansion.
 *
 * @namespace t
 * @example
 * import { t } from '../constants/translations';
 * <Text>{t.cart.empty}</Text> // "Tu carrito está vacío"
 */
export const t = {
  /** Bottom tab labels (used for accessibility, not visible in UI) */
  tabs: {
    inicio: 'Inicio',
    ofertas: 'Ofertas',
    carrito: 'Carrito',
    perfil: 'Perfil',
    ajustes: 'Ajustes',
  },

  /** Hamburger menu labels */
  menu: {
    welcome: 'Menú',
    account: 'Mi cuenta',
    contacanos: 'Contáctanos',
    misPedidos: 'Mis pedidos',
    ayuda: 'Ayuda',
    iniciarSesion: 'Iniciar sesión',
    registrarse: 'Registrarse',
    cerrarSesion: 'Cerrar sesión',
    favoritos: 'Favoritos',
  },

  /** Cart screen strings */
  cart: {
    title: 'Mi carrito',
    empty: 'Tu carrito está vacío',
    emptySubtitle: 'Agregá un producto para continuar',
    clear: 'Vaciar',
    total: 'Total',
    checkout: 'Finalizar compra',
    remove: 'Eliminar',
    removeConfirm: '¿Estás seguro?',
    clearConfirm: '¿Vaciar carrito?',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
  },

  /** Contact screen strings */
  contact: {
    title: 'Contáctanos',
    name: 'Nombre',
    email: 'Email',
    message: 'Mensaje',
    send: 'Enviar',
    findUs: 'Encuéntranos',
    followUs: 'Síguenos',
    nameRequired: 'El nombre es obligatorio',
    emailRequired: 'El email es obligatorio',
    emailInvalid: 'Ingresa un email válido',
    messageRequired: 'El mensaje es obligatorio',
    confirmation: 'Tu mensaje se preparó en tu cliente de correo.',
    error: 'No se pudo abrir el cliente de correo',
    errorLink: 'No se pudo abrir el enlace',
  },

  /** Product list and detail strings */
  products: {
    title: 'Productos',
    error: 'Error al cargar productos',
    retry: 'Tocá para reintentar',
    empty: 'No hay productos disponibles',
    allCategories: 'Categorías',
    selectCategory: 'Seleccionar categoría',
    close: 'Cerrar',
    detailTitle: 'Detalle del producto',
    errorProduct: 'Error al cargar el producto',
    notFound: 'Producto no encontrado',
    goBack: 'Volver a productos',
    backToProducts: 'Volver a productos',
  },

  /** Add to cart button */
  addToCart: 'Agregar al carrito',

  /** Ofertas placeholder */
  ofertas: {
    empty: 'No hay ofertas disponibles por el momento',
  },

  /** Perfil placeholder */
  perfil: {
    loginPrompt: 'Iniciá sesión para ver tu perfil',
    title: 'Mi perfil',
    stats: {
      orders: 'Pedidos',
      favorites: 'Favoritos',
    },
    sections: {
      account: 'Cuenta',
      preferences: 'Preferencias',
    },
    menu: {
      editProfile: 'Editar perfil',
      changePassword: 'Cambiar contraseña',
      addresses: 'Mis direcciones',
      notifications: 'Notificaciones',
      language: 'Idioma',
    },
    editProfile: {
      title: 'Editar perfil',
      fullName: 'Nombre completo',
      email: 'Email',
      phone: 'Teléfono',
      save: 'Guardar cambios',
      saving: 'Guardando...',
      success: 'Perfil actualizado correctamente',
      error: 'Error al actualizar el perfil',
      emailHint: 'El email no se puede cambiar',
    },
    addresses: {
      title: 'Mis direcciones',
      empty: 'No tenés direcciones guardadas',
      emptySubtitle: 'Agregá una dirección para agilizar tus compras',
      add: 'Agregar dirección',
      edit: 'Editar dirección',
      delete: 'Eliminar dirección',
      deleteConfirm: '¿Eliminar esta dirección?',
      label: 'Nombre',
      labelPlaceholder: 'Ej: Casa, Trabajo, Mamá',
      streetAddress: 'Dirección',
      streetAddressPlaceholder: 'Calle y número',
      apartmentUnit: 'Depto / Piso / Torre',
      apartmentUnitPlaceholder: 'Opcional',
      city: 'Ciudad',
      cityPlaceholder: 'Ciudad',
      stateProvince: 'Provincia',
      stateProvincePlaceholder: 'Provincia',
      postalCode: 'Código Postal',
      postalCodePlaceholder: 'Ej: 1425',
      country: 'País',
      countryPlaceholder: 'País',
      setDefault: 'Establecer como dirección principal',
      save: 'Guardar dirección',
      update: 'Actualizar dirección',
      saving: 'Guardando...',
      success: 'Dirección guardada correctamente',
      error: 'No se pudo guardar la dirección',
      required: 'Este campo es obligatorio',
    },
    logout: 'Cerrar sesión',
    logoutConfirm: '¿Estás seguro que querés cerrar sesión?',
    guest: 'Usuario invitado',
  },

  /** Ajustes placeholder */
  ajustes: {
    title: 'Ajustes',
    sections: {
      general: 'General',
      notifications: 'Notificaciones',
      about: 'Acerca de',
    },
    menu: {
      language: 'Idioma',
      selectLanguage: 'Seleccioná un idioma:',
      darkMode: 'Modo oscuro',
      pushNotifications: 'Notificaciones push',
      emailNotifications: 'Notificaciones por email',
      version: 'Versión de la app',
      help: 'Ayuda y soporte',
      privacy: 'Política de privacidad',
    },
  },

  /** Mis pedidos placeholder */
  pedidos: {
    empty: 'No tenés pedidos aún',
    emptySubtitle: 'Tus pedidos aparecerán acá cuando realices una compra',
    title: 'Mis pedidos',
    orderNumber: 'Pedido',
    items: 'productos',
    status: {
      pending: 'Pendiente',
      processing: 'Procesando',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    },
    date: 'Fecha',
    total: 'Total',
    details: 'Ver detalles',
    collapse: 'Ocultar detalles',
  },

  /** Ayuda placeholder */
  ayuda: {
    title: 'Ayuda y Preguntas Frecuentes',
    body: 'Estamos acá para ayudarte. Si tenés alguna duda o necesitás asistencia, no dudes en contactarnos.',
  },

  /** Favoritos */
  favoritos: {
    title: 'Favoritos',
    empty: 'No tenés productos favoritos',
    emptySubtitle: 'Agregá productos tocando el ícono de estrella',
    remove: 'Eliminar',
  },

  /** Toast messages */
  toast: {
    loginToSeeOrders: 'Iniciá sesión para ver tus pedidos',
    loginToSeeHelp: 'Iniciá sesión para acceder a ayuda',
    loginToAddCart: 'Iniciá sesión para agregar al carrito',
    loginButton: 'Iniciar sesión',
    verificationRequired: 'Verificá tu email para continuar',
  },

  /** Auth screens */
  auth: {
    loginTitle: 'Iniciar sesión',
    registerTitle: 'Crear cuenta',
    forgotPasswordTitle: '¿Olvidaste tu contraseña?',
    resetPasswordTitle: 'Nueva contraseña',
    changePasswordTitle: 'Cambiar contraseña',
    emailVerificationTitle: 'Verificá tu email',
  },

  /** Common */
  common: {
    error: 'Error',
  },
};
