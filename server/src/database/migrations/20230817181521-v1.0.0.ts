import { DataTypes, Sequelize } from 'sequelize';
import { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('roles', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updated_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  });

  await sequelize.getQueryInterface().createTable('users', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mobile_number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    created_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updated_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  });

  await sequelize.getQueryInterface().createTable('bookings', 
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
    },
    created_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updated_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  },
  );

  await sequelize.getQueryInterface().createTable('tokens', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updated_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('tokens');
  await sequelize.getQueryInterface().dropTable('bookings');
  await sequelize.getQueryInterface().dropTable('users');
  await sequelize.getQueryInterface().dropTable('roles');
};
