-- ============================================
-- Script SQL para crear la tabla de productos
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- 1. Crear la tabla products
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- 3. Habilitar Row Level Security (RLS) - opcional pero recomendado
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 4. Crear política para permitir lectura pública (solo para desarrollo)
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (true);

-- 5. Insertar datos de ejemplo (jabones de ejemplo)
INSERT INTO products (name, description, price, category, image_url) VALUES
  (
    'Jabón de Lavanda',
    'Jabón artesanal con aceite esencial de lavanda. Propiedades relajantes y aromáticas. Ideal para uso diario.',
    12.99,
    'Jabones Artesanales',
    'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400'
  ),
  (
    'Jabón de Avena y Miel',
    'Jabón exfoliante natural con avena y miel. Suaviza y nutre la piel. Perfecto para pieles sensibles.',
    14.50,
    'Jabones Artesanales',
    'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400'
  ),
  (
    'Jabón de Carbón Activado',
    'Jabón purificante con carbón activado. Limpia profundamente los poros. Ideal para pieles grasas.',
    15.99,
    'Jabones Artesanales',
    'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400'
  ),
  (
    'Jabón de Rosa Mosqueta',
    'Jabón regenerativo con aceite de rosa mosqueta. Anti-envejecimiento natural. Hidratación profunda.',
    18.00,
    'Jabones Premium',
    'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400'
  ),
  (
    'Jabón de Romero',
    'Jabón revitalizante con extracto de romero. Estimula la circulación. Aroma fresco y herbáceo.',
    13.50,
    'Jabones Artesanales',
    'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400'
  ),
  (
    'Jabón de Caléndula',
    'Jabón calmante con flores de caléndula. Propiedades antiinflamatorias. Ideal para pieles irritadas.',
    14.99,
    'Jabones Artesanales',
    'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400'
  ),
  (
    'Jabón de Cacao',
    'Jabón hidratante con manteca de cacao. Nutrición intensa para la piel seca. Aroma a chocolate.',
    16.50,
    'Jabones Premium',
    'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400'
  ),
  (
    'Jabón de Eucalipto',
    'Jabón desinfectante con aceite de eucalipto. Propiedades antibacterianas. Refrescante.',
    12.50,
    'Jabones Artesanales',
    'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400'
  ),
  (
    'Jabón de Arcilla Verde',
    'Jabón detox con arcilla verde. Purifica y desintoxica la piel. Absorbe impurezas.',
    17.00,
    'Jabones Premium',
    'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400'
  );

-- 6. Verificar que los datos se insertaron correctamente
SELECT COUNT(*) as total_products FROM products;
SELECT DISTINCT category FROM products;
