import Designer from '../models/Designer.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Logger
const logAction = (action, status) => {
  console.log(
    `[${new Date().toISOString()}] ${action} | ${status}`
  );
};

// =======================
// LOGIN DESIGNER
// =======================
export const loginDesigner = async (req, res, next) => {
  logAction('LOGIN_DESIGNER', 'Initiated');

  try {
    const { email, password } = req.body;

    const designer = await Designer.findOne({ email });

    if (!designer) {
      return res.status(404).json({
        message: 'Designer not found',
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      designer.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: 'Invalid password',
      });
    }

    const token = jwt.sign(
      {
        designerId: designer._id,
        role: 'designer',
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    logAction('LOGIN_DESIGNER', 'Success');

    res.status(200).json({
      token,
      designer,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// GET ALL DESIGNERS
// =======================
export const getAllDesigners = async (req, res, next) => {
  logAction('GET_ALL_DESIGNERS', 'Initiated');

  try {
    const designers = await Designer.find({
      isActive: true,
    }).select('-password');

    logAction('GET_ALL_DESIGNERS', 'Success');

    res.status(200).json(designers);
  } catch (error) {
    next(error);
  }
};

// =======================
// GET DESIGNER BY ID
// =======================
export const getDesignerById = async (req, res, next) => {
  logAction('GET_DESIGNER_BY_ID', 'Initiated');

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid ID format',
      });
    }

    const designer = await Designer.findById(
      req.params.id
    ).select('-password');

    if (!designer) {
      return res.status(404).json({
        message: 'Designer not found',
      });
    }

    logAction('GET_DESIGNER_BY_ID', 'Success');

    res.status(200).json(designer);
  } catch (error) {
    next(error);
  }
};

// =======================
// UPDATE DESIGNER
// =======================
export const updateDesigner = async (req, res, next) => {
  logAction('UPDATE_DESIGNER', 'Initiated');

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid ID format',
      });
    }

    const updatedDesigner =
      await Designer.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ).select('-password');

    if (!updatedDesigner) {
      return res.status(404).json({
        message: 'Designer not found',
      });
    }

    logAction('UPDATE_DESIGNER', 'Success');

    res.status(200).json(updatedDesigner);
  } catch (error) {
    next(error);
  }
};

// =======================
// DELETE DESIGNER
// =======================
export const deleteDesigner = async (req, res, next) => {
  logAction('DELETE_DESIGNER', 'Initiated');

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid ID format',
      });
    }

    const deletedDesigner =
      await Designer.findByIdAndDelete(req.params.id);

    if (!deletedDesigner) {
      return res.status(404).json({
        message: 'Designer not found',
      });
    }

    logAction('DELETE_DESIGNER', 'Success');

    res.status(200).json({
      message: 'Designer deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};