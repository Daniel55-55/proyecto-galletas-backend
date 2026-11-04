import { Router } from 'express';
import {
  obtenerGalletasVainilla,
  obtenerGalletaVainillaPorId,
  crearGalletaVainilla,
  actualizarGalletaVainilla,
  eliminarGalletaVainilla
} from '../controllers/galletas-vainilla.controller';

const router = Router();

router.get('/', obtenerGalletasVainilla);
router.get('/:id', obtenerGalletaVainillaPorId);
router.post('/', crearGalletaVainilla);
router.put('/:id', actualizarGalletaVainilla);
router.delete('/:id', eliminarGalletaVainilla);

export default router;