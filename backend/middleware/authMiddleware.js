import jwt from 'jsonwebtoken';

/**
 * Middleware: verifyToken
 * يستخرج التوكن من الـ Header (Bearer Token) ويتحقق من صلاحيته.
 */
export const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied: No token provided" });
    }

    try {
        // التحقق من التوكن باستخدام الـ Secret Key
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
        
        // حقن بيانات المستخدم (id, role) التي وضعناها داخل الـ Token في الـ Controller
        req.user = verified; 
        next();
    } catch (err) {
        // إذا كان التوكن تالفاً أو منتهي الصلاحية
        res.status(403).json({ success: false, message: "Invalid or expired Token" });
    }
};

/**
 * Middleware: adminOnly
 * يتحقق من صلاحية المستخدم (Role) بعد التأكد من وجوده عبر verifyToken.
 */
export const adminOnly = (req, res, next) => {
    // نتأكد أن req.user موجود (تم ضبطه في الـ verifyToken) وأن الـ role هو 'admin'
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        res.status(403).json({ success: false, message: "Access Denied: Admin privileges required" });
    }
};