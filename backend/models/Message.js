import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    senderName: {
      type: String,
      default: '',
    },

    senderRole: {
      type: String,
      enum: ['customer', 'designer'],
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    receiverName: {
      type: String,
      default: '',
    },

    receiverRole: {
      type: String,
      enum: ['customer', 'designer'],
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
  type: String,
  default: '',
},

    isRead: {
      type: Boolean,
      default: false,
    },
    
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model(
  'Message',
  messageSchema
);

export default Message;