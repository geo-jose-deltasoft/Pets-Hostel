const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  ownerFirstName: String,
  ownerLastName: String,
  mobileNumber: String,
  dob: Date,
  email: String,
  address: {
    street1: String,
    street2: String,
    city: String,
    state: String,
    postalCode: String,
  },
  preferredContactMethod: String,
  petName: String,
  petType: String,
  bookingDate: {
    from: Date,
    to: Date,
  },
  service: String,
  petBirthday: Date,
  petAge: Number,
  petFoodHabit: String,
  vaccinationStatus: Boolean,
  vaccinationCertificate: String,
  applicationDate: Date,
  signature: String,
});

module.exports = mongoose.model('Booking', BookingSchema);