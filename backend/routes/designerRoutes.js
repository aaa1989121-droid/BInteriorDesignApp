import express from 'express';
import { 
    getAllDesigners, 
    getDesignerById, 
    updateDesigner, 
    deleteDesigner 
} from '../controllers/designerController.js';
import { verifyToken, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// مسارات عامة (للزوار والمستخدمين)
router.get('/', getAllDesigners);
router.get('/:id', getDesignerById);

// مسارات محمية (للأدمن فقط) - تتطلب Token وصلاحية Admin
router.patch('/:id', verifyToken, adminOnly, updateDesigner);
router.delete('/:id', verifyToken, adminOnly, deleteDesigner);

export default router;