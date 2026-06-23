import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    const {
  senderId,
  senderName,
  senderRole,
  receiverId,
  receiverName,
  receiverRole,
  text,
  image,
} = req.body;

    const message = await Message.create({
      senderId,
      senderName,
      senderRole,
      receiverId,
      receiverName,
      receiverRole,
      text,
    });

    res.status(201).json(message);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          senderId,
          receiverId,
        },
        {
          senderId: receiverId,
          receiverId: senderId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDesignerMessages = async (req, res) => {
  try {
    const { designerId } = req.params;

    const messages = await Message.find({
      receiverId: designerId,
      receiverRole: 'designer',
    }).sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};