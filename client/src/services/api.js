import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// تأكدي أن هذا الـ IP هو نفس عنوان الـ IP المكتوب في التيرمنال الخاص بالـ Client
const API = axios.create({ 
    baseURL: 'http://172.20.10.2:5000/api' 
});

API.interceptors.request.use(async (req) => {
    try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser?.token) {
                req.headers.Authorization = `Bearer ${parsedUser.token}`;
            }
        }
    } catch (error) {
        console.warn("Auth token retrieval failed:", error);
    }
    return req;
});

// دوال جلب البيانات
export const fetchDesigners = async () => {
  const response = await API.get('/designers');
  console.log('DESIGNERS:', response.data);
  return response;
};
export default API;