CREATE TABLE IF NOT EXISTS galletas (
  id        SERIAL PRIMARY KEY,
  nombre    VARCHAR(100) NOT NULL,
  tamano    VARCHAR(20)  NOT NULL,
  precio    INTEGER      NOT NULL,
  cantidad  INTEGER      NOT NULL,
  tipo      VARCHAR(20)  NOT NULL CHECK (tipo IN ('chocolate', 'vainilla'))
);

ALTER TABLE galletas ENABLE ROW LEVEL SECURITY;

INSERT INTO galletas (nombre, tamano, precio, cantidad, tipo) VALUES
  ('Chocolate Clásico',       'Mediana', 3000, 30, 'chocolate'),
  ('Chocolate con Chispas',   'Mediana', 3500, 22, 'chocolate'),
  ('Chocolate con Almendras', 'Grande',  5000, 12, 'chocolate'),
  ('Chocolate con Crema',     'Grande',  4500, 16, 'chocolate'),
  ('Chocolate Especial',      'Grande',  5500,  8, 'chocolate'),
  ('Vainilla Clásica',        'Mediana', 3000, 30, 'vainilla'),
  ('Vainilla con Chispas',    'Mediana', 3500, 22, 'vainilla'),
  ('Vainilla con Almendras',  'Grande',  5000, 12, 'vainilla');