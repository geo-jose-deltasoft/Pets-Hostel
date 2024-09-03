import { v4 as uuid } from 'uuid';
import Booking from '../database/models/booking.model';
import User from '../database/models/user.model';


interface BookingAttributes {
    owner_first_name: string;
    owner_last_name: string;
    mobile_number: string;
    DOB?: Date;
    email: string;
    address?: string;
    pincode?: string;
    preferred_method_of_contact?: string;
    pet_name: string;
    pet_type: string;
    booking_date: Date;
    service: string;
    pet_birthday: Date;
    pet_age: number;
    pet_food_habit?: string;
    pet_vaccination_status: boolean;
    pet_certificate?: string;
  }

class BookingService {
    public static async createBooking(data: BookingAttributes) {
        const id = uuid();
    
        // Parse date fields to ensure they are in the correct format
        const bookingData = {
          ...data,
          booking_date: new Date(data.booking_date),
        };
    
        const booking = await Booking.create({ id, ...bookingData });
        return booking;
      }

  public static async getAllBookings(offset: number, limit: number) {
    const { count, rows } = await Booking.findAndCountAll({ offset, limit });
    return { total: count, bookings: rows };
  }

  public static async getBookingsByUser(id: string, offset: number, limit: number) {
    const user = await User.findByPk(id);
    if(!user){
        throw Error("User not found")
    }
    const { count, rows } = await Booking.findAndCountAll({ where: { email : user.email }, offset, limit });
    return { total: count, bookings: rows };
  }

  public static async getBookingById(id: string) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  }

  public static async updateBooking(id: string, data: Partial<BookingAttributes>) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    const updatedBooking = await booking.update(data);
    return updatedBooking;
  }

  public static async deleteBooking(id: string) {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    await booking.destroy();
    return true;
  }
}

export default BookingService;
