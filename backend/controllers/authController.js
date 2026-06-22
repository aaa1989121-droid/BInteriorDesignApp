import User from '../models/User.js';
import Designer from '../models/Designer.js';
import jwt from 'jsonwebtoken';

// Create JWT Token
const createToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'secretKey',
    { expiresIn: '30d' }
  );
};

// =========================
// REGISTER
// =========================
export const register = async (req, res) => {
  try {
    const {
      fullName,
      idNumber,
      email,
      password,
      role,
      style,
      phone,
      address,
      experience,
      specialization,
    } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // CUSTOMER
    if (role === 'customer') {
      const existingUser = await User.findOne({
        $or: [{ email }, { idNumber }],
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists',
        });
      }

      const user = await User.create({
        fullName,
        idNumber,
        email,
        password,
        role: 'customer',
      });

      const token = createToken(
        user._id,
        'customer'
      );

      return res.status(201).json({
        success: true,
        token,
        role: 'customer',
        user,
      });
    }

    // DESIGNER
    if (role === 'designer') {
      const existingDesigner =
        await Designer.findOne({ email });

      if (existingDesigner) {
        return res.status(400).json({
          success: false,
          message: 'Designer already exists',
        });
      }

      const designer = await Designer.create({
        name: fullName,
        email,
        password,
        role: 'designer',
        style: style || '',
        phone: phone || '',
        address: address || '',
        experience: experience || '',
        specialization:
          specialization || '',
      });

      const token = createToken(
        designer._id,
        'designer'
      );

      return res.status(201).json({
        success: true,
        token,
        role: 'designer',
        user: designer,
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Invalid role',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// LOGIN
// =========================
export const login = async (req, res) => {
  console.log('====================');
  console.log('LOGIN CALLED');

  try {
    const { email, password } = req.body;

    console.log('EMAIL =', email);
    console.log('PASSWORD =', password);

    let account = null;
    let role = '';

    account = await User.findOne({ email });

    if (account) {
      role = 'customer';
      console.log('CUSTOMER FOUND');
    }

    if (!account) {
      account = await Designer.findOne({ email });

      if (account) {
        role = 'designer';
        console.log('DESIGNER FOUND');
      }
    }

    console.log('ACCOUNT =', account);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found',
      });
    }

    const isMatch = await account.matchPassword(password);

    console.log('PASSWORD MATCH =', isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = createToken(account._id, role);

    res.status(200).json({
      success: true,
      token,
      role,
      user: account,
    });

  } catch (error) {
    console.log('LOGIN ERROR =', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
