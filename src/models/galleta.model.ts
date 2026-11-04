import { pool } from '../config/database';

export interface Galleta {
  id?: number;
  nombre: string;
  tamano: string;
  precio: number;
  cantidad: number;
  tipo?: 'chocolate' | 'vainilla';
}

export class GalletaModel {
  static async obtenerTodas(tipo: string): Promise<Galleta[]> {
    const r = await pool.query('SELECT * FROM galletas WHERE tipo = $1 ORDER BY id', [tipo]);
    return r.rows;
  }

  static async obtenerPorId(tipo: string, id: number): Promise<Galleta | null> {
    const r = await pool.query('SELECT * FROM galletas WHERE tipo = $1 AND id = $2', [tipo, id]);
    return r.rows[0] || null;
  }

  static async crear(tipo: string, g: Galleta): Promise<Galleta> {
    const r = await pool.query(
      'INSERT INTO galletas (nombre, tamano, precio, cantidad, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [g.nombre, g.tamano, g.precio, g.cantidad, tipo]
    );
    return r.rows[0];
  }

  static async actualizar(tipo: string, id: number, g: Galleta): Promise<Galleta | null> {
    const r = await pool.query(
      'UPDATE galletas SET nombre = $1, tamano = $2, precio = $3, cantidad = $4 WHERE tipo = $5 AND id = $6 RETURNING *',
      [g.nombre, g.tamano, g.precio, g.cantidad, tipo, id]
    );
    return r.rows[0] || null;
  }

  static async eliminar(tipo: string, id: number): Promise<boolean> {
    const r = await pool.query('DELETE FROM galletas WHERE tipo = $1 AND id = $2', [tipo, id]);
    return (r.rowCount ?? 0) > 0;
  }
}