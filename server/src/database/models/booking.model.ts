import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '..';
import User from './user.model';


interface BookingAttributes {
  id: string
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


class Booking extends Model<BookingAttributes> implements BookingAttributes {
  public id!: string;
  public owner_first_name!: string;
  public owner_last_name!: string;
  public mobile_number!: string;
  public DOB!: Date;
  public email!: string;
  public address!: string;
  public pincode!: string;
  public preferred_method_of_contact!: string;
  public pet_name!: string;
  public pet_type!: string;
  public booking_date!: Date;
  public service!: string;
  public pet_birthday!: Date;
  public pet_age!: number;
  public pet_food_habit!: string;
  public pet_vaccination_status!: boolean;
  public pet_certificate!: string;
}

Booking.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    owner_first_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    owner_last_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mobile_number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    preferred_method_of_contact: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    pet_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    pet_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    service: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    pet_birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    pet_age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pet_food_habit: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pet_vaccination_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    pet_certificate: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    tableName: 'bookings',
    sequelize: sequelizeConnection,
  }
);


export default Booking;
