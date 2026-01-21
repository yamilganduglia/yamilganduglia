-- Grupo SITACO - Esquema MySQL (utf8mb4)
CREATE DATABASE IF NOT EXISTS sitaco_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE sitaco_db;

CREATE TABLE IF NOT EXISTS consultas (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(120) NOT NULL,
  telefono VARCHAR(60) NOT NULL,
  email VARCHAR(180) NOT NULL,
  servicio VARCHAR(80) NOT NULL,
  mensaje TEXT NOT NULL,
  user_agent VARCHAR(255) NULL,
  ip VARCHAR(45) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_created_at (created_at),
  INDEX idx_email (email)
) ENGINE=InnoDB;
