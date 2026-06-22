import express from 'express';
import {
  loginDesigner,
  getAllDesigners,
  getDesignerById,
  updateDesigner,
  deleteDesigner,
} from '../controllers/designerController.js';

const router = express.Router();

router.post('/login', loginDesigner);

router.get('/', getAllDesigners);

router.get('/:id', getDesignerById);

router.put('/:id', updateDesigner);

router.delete('/:id', deleteDesigner);

export default router;