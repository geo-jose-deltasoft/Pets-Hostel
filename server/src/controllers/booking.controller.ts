import { Request, Response } from 'express';
import BookingService from '../services/booking.service';
import { Request as JWTRequest } from 'express-jwt';


class BookingController {
  public static async createBooking(req: Request, res: Response) {
    try {
      const booking = await BookingService.createBooking(req.body);
      return res.status(201).json(booking);
    } catch (error) {
      return res.status(500).json({ msg: 'Error creating booking', error });
    }
  }

  public static async getAllBookings(req: Request, res: Response) {
    try {
      const { offset = 0, limit = 10 } = req.query;
      const bookings = await BookingService.getAllBookings(Number(offset), Number(limit));
      return res.status(200).json(bookings);
    } catch (error) {
      return res.status(500).json({ msg: 'Error fetching bookings', error });
    }
  }

  public static async getBookingsByUser(req: JWTRequest, res: Response) {
    try {
      const { user }: any = req.auth;
      const { offset = 0, limit = 10 } = req.query;

      console.log('the user is', user)
      const bookings = await BookingService.getBookingsByUser(user, Number(offset), Number(limit));
      return res.status(200).json(bookings);
    } catch (error) {
      return res.status(500).json({ msg: 'Error fetching bookings', error });
    }
  }

  public static async getBookingById(req: Request, res: Response) {
    try {
      const booking = await BookingService.getBookingById(req.params.id);
      return res.status(200).json(booking);
    } catch (error) {
      return res.status(404).json({ msg: 'Booking not found', error });
    }
  }

  public static async updateBooking(req: Request, res: Response) {
    try {
      const booking = await BookingService.updateBooking(req.params.id, req.body);
      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json({ msg: 'Error updating booking', error });
    }
  }

  public static async deleteBooking(req: Request, res: Response) {
    try {
      await BookingService.deleteBooking(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ msg: 'Booking not found', error });
    }
  }
}

export default BookingController;
