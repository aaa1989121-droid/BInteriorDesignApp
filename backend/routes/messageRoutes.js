import express from 'express';
import {
  sendMessage,
  getMessages,
  getDesignerMessages,
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/', sendMessage);

router.get(
  '/designer/:designerId',
  getDesignerMessages
);

router.get(
  '/:senderId/:receiverId',
  getMessages
);

export default router;