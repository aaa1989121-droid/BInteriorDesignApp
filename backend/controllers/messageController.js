import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    console.log('BODY:', req.body);

    const { senderId, receiverId, text } = req.body;

    const message = await Message.create({
      senderId,
      receiverId,
      text,
    });

    console.log('MESSAGE SAVED:', message);

    res.status(201).json(message);
  } catch (error) {
    console.log('MESSAGE ERROR:', error);

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
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};