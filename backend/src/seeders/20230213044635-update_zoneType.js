'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    try{

      await queryInterface.bulkInsert('zoneTypes',
      [
        {
          id: uuidv4(),
          name: 'Others',
          description: '',
          isCustom: null, 
          isActive:true,
          createdAt: new Date()
        },

      ]);

    }
    catch (err){
      console.log("Error at 20230213044635-update_zoneType.js ", err);
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
