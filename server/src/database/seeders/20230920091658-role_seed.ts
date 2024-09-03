import { v4 as uuid } from 'uuid';
import { RoleDto } from '../../dtos/user.dto';
import { Seeder } from '../umzug';


export const up: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkInsert('roles', [
        {
            id: uuid(),
            name: RoleDto.ADMIN
        },
        {
            id: uuid(),
            name: RoleDto.USER 
        },
        {
            id: uuid(),
            name: RoleDto.STAFF 
        }
    ]);
};

export const down: Seeder = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete('roles', {});
};
