import { Router } from 'express';
import {
  obtenerGalletasChocolate,
  obtenerGalletaChocolatePorId,
  crearGalletaChocolate,
  actualizarGalletaChocolate,
  eliminarGalletaChocolate
} from '../controllers/galletas-chocolate.controller';

const router = Router();

router.get('/', obtenerGalletasChocolate);
router.get('/:id', obtenerGalletaChocolatePorId);
router.post('/', crearGalletaChocolate);
router.put('/:id', actualizarGalletaChocolate);
router.delete('/:id', eliminarGalletaChocolate);

export default router;