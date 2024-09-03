const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const API_ENDPOINTS = {
  logOut: "/api/auth/logout",
  localLogin: "/api/v1/auth/login",
  signUp: "/api/v1/auth/register",
  bookingHistoryByUser: "/api/v1/booking/user",
  createBooking:"/api/v1/booking",
  bookingHistoryAll: "/api/v1/booking",
  booking:"/api/v1/booking"
};

export const API_ROUTES = {
  getLogOut: `${API_BASE_URL}${API_ENDPOINTS.logOut}`,
  postLocalLogin: `${API_BASE_URL}${API_ENDPOINTS.localLogin}`,
  postSignUp: `${API_BASE_URL}${API_ENDPOINTS.signUp}`,
  getBookingHistoryByUser: `${API_BASE_URL}${API_ENDPOINTS.bookingHistoryByUser}`,
  createBooking: `${API_BASE_URL}${API_ENDPOINTS.createBooking}`,
  getBookingHistoryAll: `${API_BASE_URL}${API_ENDPOINTS.bookingHistoryAll}`,
  booking: `${API_BASE_URL}${API_ENDPOINTS.booking}`,



};
