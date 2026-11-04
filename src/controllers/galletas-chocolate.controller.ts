import { Request, Response, NextFunction } from 'express';
import { GalletaModel } from '../models/galleta.model';

const TIPO = 'chocolate';

export const obtenerGalletasChocolate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await GalletaModel.obtenerTodas(TIPO));
  } catch (error) {
    next(error);
  }
};

export const obtenerGalletaChocolatePorId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const galleta = await GalletaModel.obtenerPorId(TIPO, Number(req.params.id));
    if (!galleta) {
      res.status(404).json({ message: 'Galleta no encontrada' });
      return;
    }
    res.json(galleta);
  } catch (error) {
    next(error);
  }
};

export const crearGalletaChocolate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json(await GalletaModel.crear(TIPO, req.body));
  } catch (error) {
    next(error);
  }
};

export const actualizarGalletaChocolate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const galleta = await GalletaModel.actualizar(TIPO, Number(req.params.id), req.body);
    if (!galleta) {
      res.status(404).json({ message: 'Galleta no encontrada' });
      return;
    }
    res.json(galleta);
  } catch (error) {
    next(error);
  }
};

export const eliminarGalletaChocolate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ok = await GalletaModel.eliminar(TIPO, Number(req.params.id));
    if (!ok) {
      res.status(404).json({ message: 'Galleta no encontrada' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};