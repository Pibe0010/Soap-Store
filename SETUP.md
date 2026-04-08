# 🧼 Soap-Store - Guía de Configuración

## Configuración de Supabase

### Paso 1: Crear cuenta en Supabase
1. Ir a [supabase.com](https://supabase.com)
2. Crear cuenta gratuita o iniciar sesión
3. Click en "New Project"
4. Completar datos del proyecto:
   - Nombre: `soap-store`
   - Password de base de datos (guardalo!)
   - Región: `South America (São Paulo)` (más cerca de Argentina)
5. Click en "Create new project"

### Paso 2: Obtener credenciales
1. En el panel de Supabase, ir a **Settings** → **API**
2. Copiar los valores:
   - **Project URL**: `https://xxxxxxxxxx.supabase.co`
   - **Anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Paso 3: Configurar variables de entorno
1. Abrir el archivo `.env` en la raíz del proyecto
2. Reemplazar los valores:
```env
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### Paso 4: Crear la base de datos
1. En Supabase, ir a **SQL Editor** (panel izquierdo)
2. Copiar todo el contenido de `database-setup.sql`
3. Pegar en el SQL Editor
4. Click en **Run** (botón verde)
5. Verificar que dice "Success. No rows returned"

### Paso 5: Verificar la tabla
1. En Supabase, ir a **Table Editor** (panel izquierdo)
2. Deberías ver la tabla `products` con 9 registros
3. Podés editar los productos directamente desde ahí

### Paso 6: Reiniciar la app
```bash
# Detener Expo (Ctrl+C en la terminal)
# Reiniciar
npx expo start --web
```

## Estructura de la Tabla

```sql
products
├── id: UUID (Primary Key)
├── name: Text (Nombre del jabón)
├── description: Text (Descripción)
├── price: Decimal (Precio)
├── category: Text (Categoría)
├── image_url: Text (URL de imagen)
├── created_at: Timestamp
└── updated_at: Timestamp
```

## Categorías Disponibles
- Jabones Artesanales
- Jabones Premium

## URLs de Imágenes
Usamos imágenes de Unsplash para los ejemplos. Podés cambiar las URLs directamente en Supabase Table Editor.
