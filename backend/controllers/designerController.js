import Designer from '../models/Designer.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

export const loginDesigner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const designer = await Designer.findOne({ email });

    if (!designer) {
      return res.status(404).json({ message: 'Designer not found' });
    }

    const isMatch = await designer.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      _id: designer._id,
      name: designer.name,
      email: designer.email,
      role: designer.role,
      phone: designer.phone,
      specialization: designer.specialization,
      experience: designer.experience,
      about: designer.about,
      image: designer.image,
      token: generateToken(designer._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};

export const getAllDesigners = async (req, res) => {
  try {
    const designers = await Designer.find().select('-password');
    res.status(200).json(designers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get designers' });
  }
};

export const getDesignerById = async (req, res) => {
  try {
    const designer = await Designer.findById(req.params.id).select('-password');

    if (!designer) {
      return res.status(404).json({ message: 'Designer not found' });
    }

    res.status(200).json(designer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get designer' });
  }
};

export const updateDesigner = async (req, res) => {
  try {
    console.log('PARAMS ID:', req.params.id);
    console.log('BODY:', req.body);

    const updatedDesigner = await Designer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        specialization: req.body.specialization,
        experience: req.body.experience,
        about: req.body.about,
        image: req.body.image,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    if (!updatedDesigner) {
      return res.status(404).json({ message: 'Designer not found' });
    }

    res.status(200).json(updatedDesigner);
  } catch (error) {
    console.log('UPDATE DESIGNER ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteDesigner = async (req, res) => {
  try {
    const designer = await Designer.findById(req.params.id);

    if (!designer) {
      return res.status(404).json({ message: 'Designer not found' });
    }

    await designer.deleteOne();

    res.status(200).json({ message: 'Designer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete designer' });
  }
};