export const errorHandler = (err, req, res, next) => {
  // تحديد حالة الخطأ (استخدام statusCode من الخطأ إن وجد، أو الافتراضي 500)
  let statusCode = err.statusCode || 500;
  let message = err.message || 'שגיאה פנימית בשרת';

  // معالجة خطأ تكرار البيانات في MongoDB (الرمز 11000)
  if (err.code === 11000) {
    statusCode = 400;
    message = 'הנתון הזה כבר קיים במערכת (אימייל או תעודת זהות)';
  }

  // إضافة تسجيل للخطأ في الكونسول للمطورين (مهم جداً أثناء التطوير)
  console.error(`[Error Handler] ${statusCode} - ${message}`);

  res.status(statusCode).json({ 
    success: false, 
    error: message 
  });
};