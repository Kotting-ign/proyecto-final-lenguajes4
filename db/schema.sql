-- =============================================================================
-- ESQUEMA SQL RELACIONAL (PostgreSQL / Supabase)
-- Proyecto: KODEXA SQUAD — Portfolio Fullstack (4 Integrantes) · Lenguajes 4
-- Cubre: Regularización (§1, §3) + Promoción Directa Administrador (§4)
-- =============================================================================

CREATE TYPE rol_usuario AS ENUM ('registrado', 'operador', 'admin');
CREATE TYPE metodo_autenticacion AS ENUM ('propio', 'google', 'github');
CREATE TYPE estado_cuenta AS ENUM ('Activo', 'Suspendido');
CREATE TYPE tipo_consulta_enum AS ENUM ('Consulta General', 'Cotización de Proyecto', 'Asesoría Técnica');
CREATE TYPE estado_consulta_enum AS ENUM ('Pendiente', 'En Revisión', 'Respondido', 'Archivado');

-- 1. Tabla de los 4 Integrantes del Equipo Fullstack
CREATE TABLE integrante (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre VARCHAR(60) NOT NULL,
  apellido VARCHAR(60) NOT NULL,
  rol_principal VARCHAR(120) NOT NULL,
  especialidad VARCHAR(180) NOT NULL,
  bio TEXT NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  github_user VARCHAR(80) NOT NULL,
  linkedin_url VARCHAR(255),
  ubicacion VARCHAR(80) NOT NULL DEFAULT 'Argentina (UTC-3)',
  anios_experiencia INT NOT NULL CHECK (anios_experiencia >= 0),
  avatar_iniciales CHAR(2) NOT NULL,
  stack_principal TEXT[] NOT NULL DEFAULT '{}',
  disponible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 2. Tabla de Usuarios Registrados (Módulo de Registración Obligatoria §1.A y Panel §4.2)
CREATE TABLE usuario_registrado (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre VARCHAR(60) NOT NULL,
  apellido VARCHAR(60) NOT NULL,
  email VARCHAR(140) UNIQUE NOT NULL,
  password_hash VARCHAR(255), -- NULL cuando ingresa por OAuth externo (Google/GitHub)
  empresa VARCHAR(120) NOT NULL DEFAULT 'Particular',
  cargo VARCHAR(100),
  metodo_auth metodo_autenticacion NOT NULL DEFAULT 'propio',
  rol rol_usuario NOT NULL DEFAULT 'registrado',
  estado estado_cuenta NOT NULL DEFAULT 'Activo',
  accesos_totales INT NOT NULL DEFAULT 1 CHECK (accesos_totales >= 0),
  fecha_registro DATE NOT NULL DEFAULT CURRENT_DATE,
  ultimo_acceso TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 3. Tabla de Proyectos y Demos Interactivas (CRUD Administrador §4.1)
CREATE TABLE proyecto_portfolio (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  codigo VARCHAR(20) UNIQUE NOT NULL,
  titulo VARCHAR(160) NOT NULL,
  categoria VARCHAR(60) NOT NULL,
  resumen_publico TEXT NOT NULL,
  -- Columnas visibles únicamente para usuarios registrados:
  descripcion_completa TEXT NOT NULL,
  arquitectura_detalle TEXT NOT NULL,
  desafio_tecnico TEXT NOT NULL,
  solucion_implementada TEXT NOT NULL,
  stack TEXT[] NOT NULL DEFAULT '{}',
  imagen_portada_url TEXT NOT NULL,
  dimensiones_imagen VARCHAR(30) NOT NULL DEFAULT '1000x650',
  repo_url VARCHAR(255),
  demo_live_url VARCHAR(255),
  demo_endpoint_simulado VARCHAR(180) NOT NULL,
  demo_payload_ejemplo JSONB NOT NULL DEFAULT '{}'::jsonb,
  demo_respuesta_esperada JSONB NOT NULL DEFAULT '{}'::jsonb,
  destacado BOOLEAN NOT NULL DEFAULT FALSE,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  vistas_totales INT NOT NULL DEFAULT 0 CHECK (vistas_totales >= 0),
  demos_ejecutadas INT NOT NULL DEFAULT 0 CHECK (demos_ejecutadas >= 0),
  fecha_publicacion DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Relación N:M entre Proyectos y los 4 Integrantes
CREATE TABLE proyecto_integrante (
  proyecto_id INT NOT NULL REFERENCES proyecto_portfolio(id) ON DELETE CASCADE,
  integrante_id INT NOT NULL REFERENCES integrante(id) ON DELETE CASCADE,
  PRIMARY KEY (proyecto_id, integrante_id)
);

-- 4. Tabla de Servicios Ofertados (CRUD Administrador §4.1)
CREATE TABLE servicio_ofertado (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  codigo VARCHAR(20) UNIQUE NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  categoria VARCHAR(80) NOT NULL,
  descripcion TEXT NOT NULL,
  entregables TEXT[] NOT NULL DEFAULT '{}',
  tiempo_estimado_semanas INT NOT NULL CHECK (tiempo_estimado_semanas > 0),
  precio_base_usd NUMERIC(12,2) NOT NULL CHECK (precio_base_usd >= 0),
  integrante_lider_id INT REFERENCES integrante(id) ON DELETE SET NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 5. Tabla de Consultas y Solicitudes vía Email (§1.A y Gestión Operador §1.B)
CREATE TABLE consulta_contacto (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre_completo VARCHAR(120) NOT NULL,
  email VARCHAR(140) NOT NULL,
  telefono VARCHAR(40) NOT NULL,
  empresa VARCHAR(120) NOT NULL DEFAULT 'Particular',
  tipo_consulta tipo_consulta_enum NOT NULL,
  integrante_destino_id INT REFERENCES integrante(id) ON DELETE SET NULL,
  presupuesto_usd NUMERIC(12,2) CHECK (presupuesto_usd IS NULL OR presupuesto_usd >= 0),
  asunto VARCHAR(160) NOT NULL,
  mensaje TEXT NOT NULL,
  adjunto_nombre VARCHAR(255),
  adjunto_mime VARCHAR(80),
  adjunto_tamano_kb INT CHECK (adjunto_tamano_kb IS NULL OR adjunto_tamano_kb <= 5120),
  estado estado_consulta_enum NOT NULL DEFAULT 'Pendiente',
  fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 6. Tabla de Respuestas y Seguimiento por Email (§1.B Operador)
CREATE TABLE respuesta_consulta (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  consulta_id INT NOT NULL REFERENCES consulta_contacto(id) ON DELETE CASCADE,
  operador_nombre VARCHAR(120) NOT NULL,
  mensaje_respuesta TEXT NOT NULL,
  enviado_por_email BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_envio TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Trigger que pasa automáticamente la consulta a 'Respondido' cuando el operador envía una respuesta
CREATE OR REPLACE FUNCTION fn_marcar_consulta_respondida()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE consulta_contacto
  SET estado = 'Respondido'
  WHERE id = NEW.consulta_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_respuesta_actualiza_estado
AFTER INSERT ON respuesta_consulta
FOR EACH ROW EXECUTE FUNCTION fn_marcar_consulta_respondida();

-- 7. Tabla de Métricas Diarias y Contadores de Visitas (Analytics Promoción §4.3 y §4.4)
CREATE TABLE metrica_diaria (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  fecha DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  visitas_generales INT NOT NULL DEFAULT 0 CHECK (visitas_generales >= 0),
  accesos_usuarios_registrados INT NOT NULL DEFAULT 0 CHECK (accesos_usuarios_registrados >= 0),
  nuevos_registros INT NOT NULL DEFAULT 0 CHECK (nuevos_registros >= 0),
  consultas_recibidas INT NOT NULL DEFAULT 0 CHECK (consultas_recibidas >= 0),
  demos_ejecutadas INT NOT NULL DEFAULT 0 CHECK (demos_ejecutadas >= 0)
);
