'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    
    const roles = [
      { role_name: 'Superadmin', is_active: true, created_on: new Date(), created_by: 1 },
      { role_name: 'Admin', is_active: true, created_on: new Date(), created_by: 1 },
      { role_name: 'User', is_active: true, created_on: new Date(), created_by: 1 },
    ];
    await queryInterface.bulkInsert('roles', roles);

    // Insert Default Statuses
    const statuses = [
      { status_name: 'Active', is_active: true, created_on: new Date(), created_by: 1 },
      { status_name: 'Inactive', is_active: true, created_on: new Date(), created_by: 1 },
    ];
    await queryInterface.bulkInsert('statuses', statuses);

    // Get the Superadmin Role ID
    const [superadminRole] = await queryInterface.sequelize.query(
      `SELECT role_id FROM roles WHERE role_name = 'Superadmin' LIMIT 1`
    );

    // Get the Active Status ID
    const [activeStatus] = await queryInterface.sequelize.query(
      `SELECT status_id FROM statuses WHERE status_name = 'Active' LIMIT 1`
    );

    // Insert Default Superadmin User
    const hashedPassword = await bcrypt.hash('superadmin123', 10);
    await queryInterface.bulkInsert('users', [
      {
        emp_code: 'SUPER001',
        user_password: hashedPassword,
        status_id: activeStatus[0]?.status_id,
        is_active: true,
        created_by: 1,
        created_on: new Date(),
        user_role_id: superadminRole[0]?.role_id,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    // Remove All Seeded Data
    await queryInterface.bulkDelete('users', { emp_code: 'SUPER001' });
    await queryInterface.bulkDelete('roles', null);
    await queryInterface.bulkDelete('statuses', null);
  }
};
