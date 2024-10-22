// import axios from 'axios';

// // Use Vite environment variables
// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// // Create an Axios instance for authentication API requests
// const AuthApi = axios.create({
//     baseURL: apiBaseUrl,
// });

// // Define your API calls here
// export const fetchUser = () => {
//     return AuthApi.get('/users/me');
// };

// export const loginUser = (email, password) => {
//     return AuthApi.post('/users/login', { email, password });
// };

// export const registerUser = (fname, lname, email, password) => {
//     return AuthApi.post('/users/register', {
//         fname,
//         lname,
//         email,
//         password,
//         imageUrl: "",
//         tel: ""
//     });
// };

// export const checkEmailAvailability = (email) => {
//     return AuthApi.post('/users/check-email', { email });
// };

// export const logoutUser = () => {
//     return AuthApi.post('/users/logout');
// };

// export default AuthApi;
