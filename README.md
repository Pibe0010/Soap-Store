# 🧼 Soap-Store

Una aplicación móvil de e-commerce para una tienda de jabones artesanales, construida con React Native y Expo. Incluye sistema completo de autenticación, carrito de compras, favoritos, historial de pedidos y más.

## 📱 Características principales

### 🔐 Autenticación completa
- Registro y inicio de sesión con email/password
- Inicio de sesión social con Google y Apple
- Verificación obligatoria de email para todos los métodos de autenticación
- Flujo de "Olvidé mi contraseña" con reset vía email
- Cambio de contraseña para usuarios autenticados
- Persistencia de sesión con AsyncStorage
- Protección de rutas basada en autenticación y verificación de email

### 🛒 Funcionalidades de e-commerce
- Catálogo de productos con filtros por categoría
- Detalle de producto con imágenes, descripción y precio
- Carrito de compras con capacidad para agregar/eliminar items
- Lista de favoritos con animación de estrella al tocar
- Historial de pedidos con detalles completos
- Perfil de usuario editable (nombre, teléfono, avatar)
- Gestión de direcciones de envío

### 🎨 Experiencia de usuario
- Interfaz moderna usando Styled Components (sin StyleSheet.create)
- Animaciones sutiles para feedback visual (estrellas, badges, transiciones)
- Sistema de toast para notificaciones y mensajes de error
- Menú lateral con opciones autenticadas condicionales
- Deep linking para enlaces de verificación y reset de password desde email
- Loading states en todas las operaciones de autenticación
- Manejo robusto de errores con mensajes user-friendly

### 📱 Navegación
- Navegación basada en stack y tabs con React Navigation
- Protección de rutas sensibles (carrito, favoritos, pedidos, configuración)
- Redirección inteligente después de login/verificación
- Soporte para deep links desde emails de Supabase

## 🛠️ Tecnologías utilizadas

### Frontend
- **React Native** con **Expo** - Framework para aplicaciones móviles multiplataforma
- **React Navigation** - Navegación entre pantallas
- **Styled Components** - Estilización de componentes
- **React Context API** - Manejo de estado global (Auth, Cart, Favorites, Toast)
- **AsyncStorage** - Persistencia local segura de sesiones y datos

### Backend & Servicios
- **Supabase** - Backend como servicio (PostgreSQL + GoTrue Auth)
  - Autenticación de usuarios (email/password, social login)
  - Almacenamiento de productos, usuarios, pedidos, favoritos
  - Envío de emails de verificación y reset de password
  - Funciones en tiempo real y almacenamiento de archivos

### Herramientas de desarrollo
- **Jest** - Framework de testing
- **ESLint** - Linting de código JavaScript/JSX
- **TypeScript** - Tipado estático (configuración básica)
- **Git** - Control de versiones

## 📂 Estructura del proyecto

```
soap-store/
├── src/
│   ├── components/         # Componentes reutilizables
│   ├── context/            # React Context providers (Auth, Cart, Favorites, Toast)
│   ├── hooks/              # Custom hooks (useFormValidation, useProducts, etc.)
│   ├── navigation/         # Configuración de navegación (AppNavigator)
│   ├── screens/            # Pantallas de la aplicación
│   ├── services/           # Servicios (Supabase client, auth methods)
│   ├── styles/             # Estilos y temas (Styled Components)
│   ├── constants/          # Constantes (traducciones, tema)
│   └── __tests__/          # Tests unitarios
├── assets/                 # Recursos estáticos (imágenes, íconos)
├── __mocks__/              # Mocks para testing
├── openspec/               # Documentación SDD (Spec-Driven Development)
├── android/                # Configuración específica de Android
├── .env                    # Variables de entorno (no subir a git)
├── app.json                # Configuración de Expo
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo
```

## 🔑 Sistema de Autenticación

El sistema de autenticación implementado incluye:

### Flujos completos:
1. **Registro de usuario**
   - Validación de email y contraseña
   - Envío automático de email de verificación
   - Redirección a pantalla de verificación

2. **Inicio de sesión**
   - Validación de credenciales
   - Verificación de estado de email confirmado
   - Redirección condicional (verificación requerida o home)

3. **Inicio de sesión social**
   - Google y Apple mediante OAuth
   - Manejo de usuarios nuevos vs existentes
   - Verificación de email requerida

4. **Verificación de email**
   - Pantalla con estado de verificación
   - Botón para reenviar email de verificación
   - Detección automática de cambio de estado

5. **Recuperación de contraseña**
   - Solicitud de reset mediante email
   - Enlaces seguges con deep linking a la app
   - Validación de token y actualización de contraseña

6. **Cambio de contraseña**
   - Para usuarios autenticados
   - Validación de contraseña actual y nueva

### Características de seguridad:
- Contraseñas nunca almacenadas o transmitidas en texto plano
- Tokens de acceso almacenados en memoria, refresh tokens en AsyncStorage seguro
- Verificación de email requerida para TODOS los métodos de autenticación
- Rate limiting heredado de Supabase
- Nuevas sesiones invalidan las anteriores (única sesión activa por usuario)
- Tokens expiran y se renuevan automáticamente
- Nada de datos sensibles logged en consola

## 📱 Pantallas disponibles

### Autenticación
- `LoginScreen` - Inicio de sesión con email/password + social login
- `RegisterScreen` - Registro de nuevos usuarios
- `EmailVerificationScreen` - Verificación de email con reenvío
- `ForgotPasswordScreen` - Solicitud de reset de contraseña
- `ResetPasswordScreen` - Reset de contraseña con token
- `ChangePasswordScreen` - Cambio de contraseña para usuarios autenticados

### Principal
- `ProductListScreen` - Catálogo de productos con filtros
- `ProductDetailScreen` - Detalle completo de producto
- `CartScreen` - Carrito de compras
- `FavoritesScreen` - Lista de productos favoritos
- `MyOrdersScreen` - Historial de pedidos
- `SettingsScreen` - Configuración de usuario y perfil
- `PerfilScreen` - Perfil de usuario
- `EditProfileScreen` - Edición de perfil
- `AddressesScreen` - Gestión de direcciones
- `EditAddressScreen` - Edición de dirección individual
- `HelpScreen` - Centro de ayuda y soporte
- `ContactScreen` - Formulario de contacto
- `OffersScreen` - Promociones y ofertas especiales

### Componentes reutilizables
- `FormInput` - Input con validación y estados de error
- `SocialLoginButton` - Botón para login con Google/Apple
- `FavoriteButton` - Estrella animada para favoritos
- `CartIcon` - Ícono del carrito con contador animado
- `AuthMenuModal` - Menú lateral con opciones condicionales
- `ToastOverlay` - Sistema de notificaciones flotante
- `LoadingContainer` - Spinner de carga global

## ⚙️ Configuración e instalación

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Expo CLI instalado globalmente (`npm install -g expo-cli`)
- Cuenta en [Supabase](https://supabase.com)

### Pasos para configurar

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd soap-store
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Supabase**
   - Crear un nuevo proyecto en [supabase.com](https://supabase.com)
   - Obtener las credenciales de Settings → API
   - Crear un archivo `.env` en la raíz con:
     ```
     EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
     EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
     ```
   - Ejecutar el script `database-setup.sql` en el SQL Editor de Supabase para crear las tablas necesarias
   - En Supabase dashboard:
     - Habilitar Email Auth provider con confirmation required
     - Configurar proveedores OAuth de Google y Apple
     - Configurar URL settings para deep linking:
       - Site URL: `soapstore://`
       - Additional redirect URLs: 
         - `soapstore://update-password`
         - `soapstore://verify-email`
         - `soapstore://`

4. **Iniciar la aplicación**
   ```bash
   # Para desarrollo web
   npx expo start --web
   
   # Para desarrollo en Android
   npx expo start --android
   
   # Para desarrollo en iOS (requiere Mac)
   npx expo start --ios
   ```

5. **Escaneo en dispositivo físico**
   - Instalar la app Expo Go desde App Store o Play Store
   - Escanear el QR code mostrado en la terminal

## 🧠 Arquitectura y patrones

### Manejo de estado
- **AuthContext**: Estado de autenticación global (usuario, sesión, loading)
- **CartContext**: Estado del carrito (items, total, operaciones)
- **FavoritesContext**: Lista de productos favoritos con persistencia en AsyncStorage
- **ToastContext**: Sistema de notificaciones global con API imperativa

### Capas de separación
1. **Presentation Layer**: Screens y componentes UI
2. **Service Layer**: Wrapper alrededor del cliente Supabase
3. **State Management Layer**: Contextos de React para estado global
4. **Data Access Layer**: Integración directa con Supabase

### Patrones de diseño utilizados
- **Container/Presentational pattern** - Separación de lógica y presentación
- **Custom Hooks** - Encapsular lógica reutilizable (useFormValidation, useProducts)
- **Singleton pattern** - Cliente Supabase inicializado una sola vez
- **Observer pattern** - Suscriptores a cambios de estado de autenticación
- **Factory pattern** - Mapeadores de datos de DB a objetos JS

## 📝 Guía de contribución

1. Fork el repositorio
2. Create una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abra un Pull Request

### Estándares de código
- Usar convenciones de commits convencionales
- Seguir el estilo de código existente (indentación, naming, etc.)
- Escribir pruebas unitarias para nueva lógica de negocio
- Documentar cambios complejos en comentarios
- Mantener los componentes pequeños y enfocados

## 📄 Licencia

Este proyecto está bajo licencia MIT - ve el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- Expo por hacer el desarrollo de React Native accesible
- Supabase por su excelente backend como servicio
- React Native Community por los componentes y bibliotecas de código abierto
- Unsplash por las imágenes de productos utilizadas en los ejemplos

---

**¡Gracias por usar Soap-Store!** Si tienes preguntas o necesitas ayuda, por favor abre un issue en el repositorio. 🧼✨