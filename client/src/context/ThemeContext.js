import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // تعريف الألوان الجديدة بناءً على طلبك
  const colors = {
    // الأزرق الباستيل (الأساسي)
    primary: isDarkMode ? '#5A9BD5' : '#89CFF0', 
    // الأخضر الباستيل (للأزرار الثانوية)
    secondary: isDarkMode ? '#5CA65C' : '#77DD77', 
    // خلفية التطبيق (أزرق باستيل فاتح جداً)
    background: isDarkMode ? '#1E2A38' : '#F0F8FF', 
    // لون الكاردات (أبيض أو رمادي فاتح)
    card: isDarkMode ? '#2C3E50' : '#FFFFFF', 
    // الرمادي الغامق للعناوين والنصوص (مهم جداً)
    text: isDarkMode ? '#E0E0E0' : '#4A4A4A', 
    // رمادي للنصوص الثانوية
    textSecondary: isDarkMode ? '#B0B0B0' : '#666666', 
    // لون الحدود
    border: isDarkMode ? '#34495E' : '#B0C4DE',
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);