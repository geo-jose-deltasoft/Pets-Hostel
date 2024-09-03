import express from 'express';
import { BookingController } from '../controllers';
import isAdmin from '../middlewares/isAdmin';

const router = express.Router();

router.post('/', 
BookingController.createBooking);
router.get('/', isAdmin.verify, BookingController.getAllBookings);
router.get('/user', BookingController.getBookingsByUser);  // User-specific bookings
router.get('/:id', isAdmin.verify,  BookingController.getBookingById);
router.put('/:id', isAdmin.verify, BookingController.updateBooking);  // Only admin can update
router.delete('/:id', isAdmin.verify, BookingController.deleteBooking);  // Only admin can delete



export default router;
